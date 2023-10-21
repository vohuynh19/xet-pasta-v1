import { Divider, message } from "antd";
import { useMemo, useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Demographic,
  ToppingName,
  useOrders,
  useOrdersFilter,
} from "src/modules/order";
import { theme } from "styles";
import { DatePicker, Space } from "antd";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";

const { RangePicker } = DatePicker;

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
import { Logout } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { auth } from "src/infra/firebase";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const HostView = () => {
  const [time, setTime] = useState<"all" | "morning" | "evening">("all");
  const [dateRange, setDateRage] = useState<string[]>();

  const { orders, isLoading } = useOrders(
    time === "all"
      ? "ALL_DONE_TODAY"
      : time === "morning"
      ? "ALL_DONE_MORNING"
      : "ALL_DONE_EVENING"
    // dateRange?.[0] || "",
    // dateRange?.[1] || ""
  );

  //
  // Total receive &  Total revenue chart
  // const total = (orders || []).reduce((prev, current) => {
  //   return (prev = prev + current.totalPrice);
  // }, 0);

  const totalCash = (orders || []).reduce((prev, current) => {
    if (current.paymentMethod !== "cash") {
      return prev;
    }
    return (prev = prev + current.totalPrice);
  }, 0);

  const totalOnline = (orders || []).reduce((prev, current) => {
    if (current.paymentMethod !== "cash") {
      return (prev = prev + current.totalPrice);
    }
    return prev;
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
            xet_ai_cap:
              p.xet_ai_cap +
              (c.size === "M" && c.name === "xet_ai_cap" ? c.amount : 0),
            xet_nhen_nhen:
              p.xet_nhen_nhen +
              (c.size === "M" && c.name === "xet_nhen_nhen" ? c.amount : 0),
            xet_zombie:
              p.xet_zombie +
              (c.size === "M" && c.name === "xet_zombie" ? c.amount : 0),
          };
        },
        {
          xet_truyen_thong_M: 0,
          xet_truyen_thong_L: 0,
          xet_tan_chay_M: 0,
          xet_tan_chay_L: 0,
          xet_ai_cap: 0,
          xet_nhen_nhen: 0,
          xet_zombie: 0,
        }
      );
      return {
        xet_truyen_thong_M:
          prev.xet_truyen_thong_M + singleData.xet_truyen_thong_M,
        xet_truyen_thong_L:
          prev.xet_truyen_thong_L + singleData.xet_truyen_thong_L,
        xet_tan_chay_M: prev.xet_tan_chay_M + singleData.xet_tan_chay_M,
        xet_tan_chay_L: prev.xet_tan_chay_L + singleData.xet_tan_chay_L,
        xet_ai_cap: prev.xet_ai_cap + singleData.xet_ai_cap,
        xet_nhen_nhen: prev.xet_nhen_nhen + singleData.xet_nhen_nhen,
        xet_zombie: prev.xet_zombie + singleData.xet_zombie,
      };
    },
    {
      xet_truyen_thong_M: 0,
      xet_truyen_thong_L: 0,
      xet_tan_chay_M: 0,
      xet_tan_chay_L: 0,
      xet_ai_cap: 0,
      xet_nhen_nhen: 0,
      xet_zombie: 0,
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

  const onChange = (
    value: RangePickerProps["value"]
    // dateString: [string, string] | string
  ) => {
    setDateRage([
      value?.[0]?.toISOString() || "",
      value?.[1]?.toISOString() || "",
    ]);
  };

  const onOk = (
    value: DatePickerProps["value"] | RangePickerProps["value"]
  ) => {
    console.log("onOk: ", value);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      message.success("Đăng xuất thành công");
    } catch (error) {
      message.error("Có lỗi xảy ra");
    }
  };
  const totalWeight = useMemo(() => {
    // TODO: Add unit gram
    const mi =
      totalMainDishes.xet_truyen_thong_M * 160 +
      totalMainDishes.xet_truyen_thong_L * 200 +
      totalMainDishes.xet_tan_chay_M * 160 +
      totalMainDishes.xet_tan_chay_L * 200 +
      totalMainDishes.xet_nhen_nhen * 200 +
      totalMainDishes.xet_ai_cap * 200;
    const sot =
      totalMainDishes.xet_truyen_thong_M * 90 +
      totalMainDishes.xet_truyen_thong_L * 110 +
      totalMainDishes.xet_tan_chay_M * 90 +
      totalMainDishes.xet_tan_chay_L * 110 +
      totalMainDishes.xet_nhen_nhen * 110 +
      totalMainDishes.xet_ai_cap * 110;

    const xuc_xich = totalTopping.xuc_xich * 25;
    const pho_mai_lat =
      (totalMainDishes.xet_truyen_thong_M +
        totalMainDishes.xet_truyen_thong_L +
        totalTopping.pho_mai_lat) *
      4.1;
    const pho_mai_soi =
      totalMainDishes.xet_tan_chay_M * 15 +
      +totalMainDishes.xet_tan_chay_L * 15 +
      totalTopping.pho_mai_soi * 10;
    const ga_popcorn = totalTopping.ga_popcorn * 24;

    return {
      mi,
      sot,
      xuc_xich,
      pho_mai_lat,
      pho_mai_soi,
      ga_popcorn,
    };
  }, [totalMainDishes, totalTopping]);

  return (
    <div
      style={{
        padding: 16,
      }}
    >
      <div style={{ marginBottom: 8 }}>
        <span onClick={logout}>
          <Logout />
        </span>
      </div>
      {/* <RangePicker
        size="large"
        showTime={{ format: "HH:mm" }}
        format="YYYY-MM-DD HH:mm"
        onChange={onChange}
        onOk={onOk}
      /> */}
      <div
        style={{
          // marginTop: 16,
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
          marginBottom: 8,
        }}
      >
        <div style={{ flex: 1, fontSize: 18 }}>
          Phần thường:{" "}
          {totalMainDishes.xet_truyen_thong_M +
            totalMainDishes.xet_truyen_thong_L +
            totalMainDishes.xet_tan_chay_M +
            totalMainDishes.xet_tan_chay_L}
        </div>

        <div style={{ flex: 1, fontSize: 18 }}>
          Phần Halloween:{" "}
          {totalMainDishes.xet_nhen_nhen +
            totalMainDishes.xet_ai_cap +
            totalMainDishes.xet_zombie}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: 1, fontSize: 18 }}>Tiền mặt: {totalCash}k</div>

        <div style={{ flex: 1, fontSize: 18 }}>Tiền bank: {totalOnline}k</div>
      </div>

      <Divider />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div style={{ flex: 1, fontSize: 16 }}>Mì: {totalWeight.mi} g</div>
        <div style={{ flex: 1, fontSize: 16 }}>Sốt: {totalWeight.sot} g</div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 16,
        }}
      >
        <div style={{ flex: 1, fontSize: 16 }}>
          Phô mai lát: {totalWeight.pho_mai_lat} g
        </div>
        <div style={{ flex: 1, fontSize: 16 }}>
          Phô mai sợi: {totalWeight.pho_mai_soi} g
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div style={{ flex: 1, fontSize: 16 }}>
          Xúc xích: {totalWeight.xuc_xich} g
        </div>
        <div style={{ flex: 1, fontSize: 16 }}>
          Gà popcorn: {totalWeight.ga_popcorn} g
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
        <h2>Doanh số halloween:</h2>
        <Bar
          data={{
            labels: ["Zombie", "Ai Cập", "Nhện"],
            datasets: [
              {
                label: "Phần",
                data: [
                  totalMainDishes.xet_zombie,
                  totalMainDishes.xet_ai_cap,
                  totalMainDishes.xet_nhen_nhen,
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

export default HostView;
