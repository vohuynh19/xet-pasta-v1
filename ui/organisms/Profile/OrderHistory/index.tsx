import { DatePicker, Table, Typography } from "antd";
import { Container } from "./styled";
import { SizeBox } from "ui/atoms";

const OrderHistory = () => {
  return (
    <Container>
      <Typography.Title level={3}>Order History</Typography.Title>

      <DatePicker.RangePicker showTime />

      <SizeBox height={24} />

      <Table />
    </Container>
  );
};

export default OrderHistory;
