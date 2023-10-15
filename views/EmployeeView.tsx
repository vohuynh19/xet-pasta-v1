import { Logout } from "@mui/icons-material";
import { Divider, Drawer, message } from "antd";
import { signOut } from "firebase/auth";
import { onSnapshot } from "firebase/firestore";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { auth, orderCollection } from "src/infra/firebase";
import {
  MainDish,
  OrderSchema,
  getDishNameInInvoice,
  getDishTotalPrice,
  getDishUnitPrice,
  useOrders,
} from "src/modules/order";
import { theme } from "styles";
import { AppLoading } from "ui";

const EmployeeView = () => {
  const { isLoading, orders, refetch } = useOrders("LATEST_10");
  const [open, setOpen] = useState(false);
  const [currentOrder, setCurrentOrder] = useState<OrderSchema>();

  useEffect(() => {
    onSnapshot(orderCollection, {
      next: () => refetch(),
      complete: () => refetch(),
      error: () => refetch(),
    });
  }, [refetch]);

  const logout = async () => {
    try {
      await signOut(auth);
      message.success("Đăng xuất thành công");
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };

  const onShowModal = useCallback((order: OrderSchema) => {
    setCurrentOrder(order);
    setOpen(true);
  }, []);

  if (isLoading) {
    return <AppLoading />;
  }

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        placement="bottom"
        width={500}
        height={500}
        onClose={onClose}
        open={open}
        headerStyle={{ display: "none" }}
      >
        {currentOrder && (
          <InvoiceDish
            dishes={currentOrder?.dishes}
            total={currentOrder?.totalPrice}
          />
        )}
      </Drawer>

      <div style={{ padding: 16, background: "#f5f5f5" }}>
        <div style={{ marginBottom: 8 }}>
          <span onClick={logout}>
            <Logout />
          </span>
        </div>

        {orders?.length === 0 && <div>Hiện tại chưa có đơn hàng nào</div>}

        {orders?.map((order) => {
          return (
            <OrderItem key={order.id} order={order} onPress={onShowModal} />
          );
        })}
      </div>
    </>
  );
};

const OrderItem = ({
  order,
  onPress,
}: {
  order: OrderSchema;
  onPress: (order: OrderSchema) => void;
}) => {
  const getOrderColor = () => {
    switch (order.status) {
      case "CREATED":
        return theme.colors.secondary;
      case "PROCESSING":
        return theme.colors.warning;
      case "DONE":
        return theme.colors.success;
      case "DELETED":
        return theme.colors.error;
      default:
        return theme.colors.secondary;
    }
  };

  const getStatus = () => {
    switch (order.status) {
      case "CREATED":
        return "Chưa thanh toán";
      case "PROCESSING":
        return "Đang chờ bếp";
      case "DONE":
        return "Đã hoàn thành";
      case "DELETED":
        return "Đã huỷ";
      default:
        return "Không xác định";
    }
  };

  return (
    <div onClick={() => onPress(order)}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "white",
          marginBottom: 16,
          padding: 16,
          borderRadius: 16,
        }}
      >
        <div>
          <div
            style={{
              paddingBottom: 4,
              fontWeight: 700,
              fontSize: 20,
            }}
          >
            {order.totalPrice},000 VND
          </div>
          <div>
            Vào lúc: {moment(order.updatedAt).format("HH:mm DD/MM/YYYY")}
          </div>
        </div>

        <div>
          <div
            style={{
              color: getOrderColor(),
            }}
          >
            {getStatus()}
          </div>
        </div>
      </div>
    </div>
  );
};

export const InvoiceDish = ({
  total,
  dishes,
}: {
  total: number;
  dishes: MainDish[];
}) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <div
        style={{
          height: 20,
          display: "flex",
          flexDirection: "row",
          padding: "0 16px",
        }}
      >
        <div style={{ flex: 1 }}>Tên món</div>
        <div style={{ textAlign: "center", width: 40 }}>SL</div>
        <div style={{ textAlign: "center", width: 40 }}>Giá</div>
        <div style={{ textAlign: "center", width: 80 }}>Thành tiền</div>
      </div>

      <Divider />

      <div style={{ flex: 1, overflowY: "auto" }}>
        <div>
          {dishes.map((dish, index) => (
            <div
              key={JSON.stringify(dish)}
              style={{
                maxHeight: 80,
                padding: "0 16px",
              }}
            >
              <InvoiceDishItem dish={dish} />
              {index !== dishes.length - 1 && <Divider />}
            </div>
          ))}
        </div>
      </div>

      <Divider />

      <div
        style={{
          height: 20,
          display: "flex",
          flexDirection: "row",
          padding: "0 16px",
        }}
      >
        <div style={{ flex: 1 }}>
          <div>Tổng tiền</div>
        </div>

        <div style={{ width: 80 }}>
          <div style={{ textAlign: "center" }}>{total}k</div>
        </div>
      </div>
    </div>
  );
};

export const InvoiceDishItem = ({ dish }: { dish: MainDish }) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <div style={{ flex: 1 }}>{getDishNameInInvoice(dish)}</div>
      <div style={{ width: 40, textAlign: "center" }}>{dish.amount}</div>
      <div style={{ width: 40, textAlign: "center" }}>
        {getDishUnitPrice(dish)}k
      </div>
      <div style={{ width: 80, textAlign: "center" }}>
        {getDishTotalPrice(dish)}k
      </div>
    </div>
  );
};

export default EmployeeView;
