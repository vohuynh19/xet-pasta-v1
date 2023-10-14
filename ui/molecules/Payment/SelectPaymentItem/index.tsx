import { Radio, Typography } from "antd";
import {
  Container,
  PaymentHead,
  PaymentContent,
  LeftHead,
  RightHead,
} from "./styled";

import { ReactNode } from "react";

type Props = {
  value: string;
  paymentMethod: string;
  icon: ReactNode;
  content?: ReactNode;
  avatar?: ReactNode;
  isSelected?: boolean;
};

const SelectPaymentItem = ({
  paymentMethod,
  icon,
  avatar,
  value,
  content,
  isSelected = false,
}: Props) => {
  console.log(paymentMethod);
  return (
    <Container>
      <PaymentHead>
        <LeftHead>
          <Radio value={value} />
          {icon}
          <Typography.Text>{paymentMethod}</Typography.Text>
        </LeftHead>

        <RightHead>{avatar}</RightHead>
      </PaymentHead>

      {isSelected && <PaymentContent>{content}</PaymentContent>}
    </Container>
  );
};

export default SelectPaymentItem;
