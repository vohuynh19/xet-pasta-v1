import { Typography } from "antd";
import Image from "next/image";

import { Flex, FlexSpaceBetween } from "styles";

type Props = {
  src: string;
  title: string;
  price: number;
  currency: string;
};

const PaymentOrderItem = ({ src, title, price, currency }: Props) => {
  return (
    <FlexSpaceBetween style={{ marginBottom: 24 }}>
      <Flex style={{ flex: 1 }}>
        <Image
          alt="order"
          src={src}
          width={40}
          height={40}
          style={{ marginRight: 12 }}
        />

        <Typography.Text style={{ paddingRight: 24 }}>{title}</Typography.Text>
      </Flex>

      <p>{`${price} ${currency}`}</p>
    </FlexSpaceBetween>
  );
};

export default PaymentOrderItem;
