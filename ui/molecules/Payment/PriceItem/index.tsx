import { Typography } from "antd";
import { CSSProperties } from "react";
import { FlexSpaceBetween } from "styles";

type Props = {
  label: string;
  amount: number;
  currency: string;
  textStyle?: CSSProperties;
};

const PriceItem = ({ label, amount, currency, textStyle }: Props) => {
  return (
    <FlexSpaceBetween>
      <Typography.Paragraph style={textStyle}>{label}</Typography.Paragraph>

      <Typography.Paragraph style={textStyle}>
        {`${amount} ${currency}`}
      </Typography.Paragraph>
    </FlexSpaceBetween>
  );
};

export default PriceItem;
