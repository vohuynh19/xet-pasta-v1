import { useCallback, useEffect, useState } from "react";
import type { NextPage } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Head from "next/head";
import { Divider, Drawer, Form, Input, message } from "antd";
import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";

import { auth, orderCollection } from "src/infra/firebase";

import { AppLoading, Button } from "ui/atoms";

import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import {
  Demographic,
  MainDish,
  OrderSchema,
  ToppingName,
  getDishNameInInvoice,
  getDishTotalPrice,
  getDishUnitPrice,
  useOrders,
} from "src/modules/order";
import moment from "moment";
import { theme } from "styles";
import { Logout } from "@mui/icons-material";
import { onSnapshot } from "firebase/firestore";
import { Bar, Pie } from "react-chartjs-2";

export async function getStaticProps({ locale }: StaticProps) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "sentence", "home"])),
    },
  };
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const StyledWrapper = styled.div`
  height: 100vh;
  padding: 8px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Home: NextPage = () => {
  const [user] = useAuthState(auth);

  return (
    <>
      <Head>
        <title>Xet Pasta - Mì ý phô mai</title>
      </Head>

      {user?.email === "xet.host@gmail.com" && <HostView />}
      {user?.email === "xet.service@gmail.com" && <UserView />}

      {!user?.email && <AuthView />}
    </>
  );
};

const UserView = () => {
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
    console.log("asd");
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

const HostView = () => {
  const [time, setTime] = useState<"all" | "morning" | "evening">("all");

  const { orders, isLoading } = useOrders(
    // time === "all"
    //   ? "ALL_DONE_TODAY"
    //   : time === "morning"
    //   ? "ALL_DONE_MORNING"
    //   : "ALL_DONE_EVENING"
    "ALL"
  );

  //
  // Total receive &  Total revenue chart
  const total = (orders || []).reduce((prev, current) => {
    return (prev = prev + current.totalPrice);
  }, 0);

  // Maindish
  // Tan chay amount
  // Truyen thong amount
  const totalMainDishes: Record<string, number> = (orders || []).reduce(
    (prev, current) => {
      const singleData = current.dishes.reduce(
        (p, c) => {
          return {
            xet_truyen_thong_M:
              p.xet_truyen_thong_M +
              (c.size === "M" && c.name === "xet_truyen_thong" ? c.amount : 0),
            xet_truyen_thong_L:
              p.xet_truyen_thong_L +
              (c.size === "L" && c.name === "xet_truyen_thong" ? c.amount : 0),
            xet_tan_chay_M:
              p.xet_tan_chay_M +
              (c.size === "M" && c.name === "xet_tan_chay" ? c.amount : 0),
            xet_tan_chay_L:
              p.xet_tan_chay_L +
              (c.size === "L" && c.name === "xet_tan_chay" ? c.amount : 0),
          };
        },
        {
          xet_truyen_thong_M: 0,
          xet_truyen_thong_L: 0,
          xet_tan_chay_M: 0,
          xet_tan_chay_L: 0,
        }
      );
      return {
        xet_truyen_thong_M:
          prev.xet_truyen_thong_M + singleData.xet_truyen_thong_M,
        xet_truyen_thong_L:
          prev.xet_truyen_thong_L + singleData.xet_truyen_thong_L,
        xet_tan_chay_M: prev.xet_tan_chay_M + singleData.xet_tan_chay_M,
        xet_tan_chay_L: prev.xet_tan_chay_L + singleData.xet_tan_chay_L,
      };
    },
    {
      xet_truyen_thong_M: 0,
      xet_truyen_thong_L: 0,
      xet_tan_chay_M: 0,
      xet_tan_chay_L: 0,
    }
  );

  // Topping
  // Topping amount
  const totalTopping: Record<ToppingName, number> = (orders || []).reduce(
    (prev, current) => {
      const singleData = current.dishes.reduce(
        (p, c) => {
          if (c.toppings?.xa_lach) {
            // console.log('xalach', current);
          }

          return {
            xuc_xich: p.xuc_xich + (c.toppings?.xuc_xich || 0) * c.amount,
            pho_mai_lat:
              p.pho_mai_lat + (c.toppings?.pho_mai_lat || 0) * c.amount,
            pho_mai_soi:
              p.pho_mai_soi + (c.toppings?.pho_mai_soi || 0) * c.amount,
            xa_lach: p.xa_lach + (c.toppings?.xa_lach || 0) * c.amount,
            ga_popcorn: p.ga_popcorn + (c.toppings?.ga_popcorn || 0) * c.amount,
          };
        },
        {
          xuc_xich: 0,
          pho_mai_lat: 0,
          pho_mai_soi: 0,
          xa_lach: 0,
          ga_popcorn: 0,
        }
      );

      return {
        xuc_xich: prev.xuc_xich + singleData.xuc_xich,
        pho_mai_lat: prev.pho_mai_lat + singleData.pho_mai_lat,
        pho_mai_soi: prev.pho_mai_soi + singleData.pho_mai_soi,
        xa_lach: prev.xa_lach + singleData.xa_lach,
        ga_popcorn: prev.ga_popcorn + singleData.ga_popcorn,
      };
    },
    {
      xuc_xich: 0,
      pho_mai_lat: 0,
      pho_mai_soi: 0,
      xa_lach: 0,
      ga_popcorn: 0,
    }
  );

  const demographic: Record<Demographic, number> = (orders || []).reduce(
    (prev, cur) => {
      return {
        kid: prev.kid + (cur.demographics.kid ? 1 : 0),
        cap_1: prev.cap_1 + (cur.demographics.cap_1 ? 1 : 0),
        cap_2: prev.cap_2 + (cur.demographics.cap_2 ? 1 : 0),
        cap_3: prev.cap_3 + (cur.demographics.cap_3 ? 1 : 0),
        "20-30": prev["20-30"] + (cur.demographics["20-30"] ? 1 : 0),
        ">30": prev[">30"] + (cur.demographics[">30"] ? 1 : 0),
      };
    },
    {
      kid: 0,
      cap_1: 0,
      cap_2: 0,
      cap_3: 0,
      "20-30": 0,
      ">30": 0,
    }
  );
  return (
    <div
      style={{
        padding: 16,
      }}
    >
      <div
        style={{
          display: "flex",
        }}
      >
        <div
          style={{
            flex: 1,
            cursor: "pointer",
            textAlign: "center",
            backgroundColor:
              time === "all" ? theme.colors.primary : theme.colors.white,
            color: time === "all" ? theme.colors.white : theme.colors.secondary,
            padding: "16px 0",
          }}
          onClick={() => setTime("all")}
        >
          Cả ngày
        </div>
        <div
          style={{
            flex: 1,
            cursor: "pointer",
            textAlign: "center",
            backgroundColor:
              time === "morning" ? theme.colors.primary : theme.colors.white,
            color:
              time === "morning" ? theme.colors.white : theme.colors.secondary,
            padding: "16px 0",
          }}
          onClick={() => setTime("morning")}
        >
          Sáng
        </div>
        <div
          style={{
            flex: 1,
            cursor: "pointer",
            textAlign: "center",
            backgroundColor:
              time === "evening" ? theme.colors.primary : theme.colors.white,
            color:
              time === "evening" ? theme.colors.white : theme.colors.secondary,
            padding: "16px 0",
          }}
          onClick={() => setTime("evening")}
        >
          Chiều
        </div>
      </div>

      <Divider />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: 1, fontSize: 18 }}>Doanh thu: {total}k</div>

        <div style={{ flex: 1, fontSize: 18 }}>
          Số phần:{" "}
          {totalMainDishes.xet_truyen_thong_M +
            totalMainDishes.xet_truyen_thong_L +
            totalMainDishes.xet_tan_chay_M +
            totalMainDishes.xet_tan_chay_L}
        </div>
      </div>

      <Divider />

      <div>
        <h2>Doanh số món chính:</h2>
        <Bar
          data={{
            labels: ["TT | M", "TT | L", "TC | M", "TC | L"],
            datasets: [
              {
                label: "Phần",
                data: [
                  totalMainDishes.xet_truyen_thong_M,
                  totalMainDishes.xet_truyen_thong_L,
                  totalMainDishes.xet_tan_chay_M,
                  totalMainDishes.xet_tan_chay_L,
                ],
              },
            ],
          }}
        />
      </div>

      <Divider />

      <div>
        <h2>Doanh số topping:</h2>
        <Bar
          data={{
            labels: ["Xúc xích", "Gà viên", "PM lát", "PM sợi", "Xà lách"],
            datasets: [
              {
                label: "Phần",
                data: [
                  totalTopping.xuc_xich,
                  totalTopping.ga_popcorn,
                  totalTopping.pho_mai_lat,
                  totalTopping.pho_mai_soi,
                  totalTopping.xa_lach,
                ],
              },
            ],
          }}
        />
      </div>

      <Divider />

      <div>
        <h2>Nhân khẩu học</h2>
        <Pie
          data={{
            labels: ["Trẻ em", "Cấp 1", "Cấp 2", "Cấp 3", "20-30", ">30"],
            datasets: [
              {
                label: "# User",
                data: [
                  demographic.kid,
                  demographic.cap_1,
                  demographic.cap_2,
                  demographic.cap_3,
                  demographic["20-30"],
                  demographic[">30"],
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)",
                ],
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

const AuthView = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      message.success("Đăng nhập thành công");
    } catch (error) {
      message.error("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <StyledWrapper>
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Đăng nhập
      </h2>

      <Form>
        <Form.Item>
          <Input
            placeholder="Nhập tài khoản"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>

        <Form.Item>
          <Input
            type="password"
            placeholder="Nhập mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Button type="primary" isFullWidth onClick={signIn}>
          Đăng nhập
        </Button>
      </Form>
    </StyledWrapper>
  );
};

export default Home;
