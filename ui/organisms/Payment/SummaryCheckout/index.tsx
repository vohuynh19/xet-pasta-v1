import { Divider, Space, Tour, TourProps, Typography } from "antd";
import { useTranslation } from "next-i18next";
import { API_HOST, PAGE_ROUTES } from "@constants";

import { Button, SizeBox } from "ui/atoms";
import { PriceItem } from "ui/molecules";
import { useState } from "react";
import { useRouter } from "next/router";
import {
  useGetVerifyCode,
  useMyProfile,
  useOwernOfGuide,
  useUserDetail,
} from "hooks";
import { HARD_URL } from "@constants";
import { API_ENDPONTS } from "src/infra/https";

export const SummaryPayment = {
  originalPrice: 200000,
  discounts: -0,
  priceSymbol: "đ",
  total: 200000,
};

const { Text, Link, Title, Paragraph } = Typography;

interface Props {}

const Checkout: React.FC<Props> = ({}) => {
  const { t } = useTranslation(["common", "sentence"]);

  const router = useRouter();
  let { discordId, code, guideId } = router.query;
  const { data: verifyCode } = useGetVerifyCode(discordId as string);
  const { data: profile } = useOwernOfGuide(guideId as string);
  const { data: myProfile } = useMyProfile();

  const [open, setOpen] = useState<boolean>(false);

  const steps: TourProps["steps"] = [
    {
      title: t("payment"),
      description: (
        <Space direction="vertical">
          <Text>Bạn đã thanh toán chưa ?</Text>
          <Text>
            <Text strong>Chưa </Text>! Không sao, ấn "Next"
          </Text>
        </Space>
      ),
      target: null,
    },
    {
      title: t("joinPrivateDiscord"),
      description: (
        <Space direction="vertical">
          {t("joinDiscord")}
          <Link
            target="_blank"
            href={profile?.profileDiscordLink || HARD_URL.VICODEMY_WELCOME}
          >
            {` ${profile?.displayName || "Vicodemy"}'s private channel`}
          </Link>
          <Text>
            {`${t("yourCode")}: `}
            <Text strong>{verifyCode?.code}</Text>
          </Text>
        </Space>
      ),
      target: null,
    },
    {
      title: t("access"),
      description: (
        <Text>
          {t("checkoutSentence1")}
          <Text strong>{t("checkoutSentence2")}</Text>
        </Text>
      ),
      target: null,
    },
  ];

  const handleCompleteCheckout = () => {
    if (myProfile) {
      window.open(HARD_URL.MOMO_CHECKOUT, "_blank");
      setOpen(true);
    } else {
      // TODO: cannot route to checkout?discordId=...&guideId=.... it auto remove after & fuck.
      const { protocol, host } = window.location;
      const completeUrl = `${protocol}//${host}`;
      router.push(`${API_HOST}${API_ENDPONTS.auth.LOGIN(completeUrl)}`);
    }
  };

  return (
    <>
      <Typography.Title level={4}>{t("summary")}</Typography.Title>

      <Divider />

      <PriceItem
        label={t("originalPrice")}
        amount={SummaryPayment.originalPrice}
        currency={SummaryPayment.priceSymbol}
      />

      <PriceItem
        label={t("discounts")}
        amount={SummaryPayment.discounts}
        currency={SummaryPayment.priceSymbol}
      />

      <Divider />

      <PriceItem
        label={t("total")}
        amount={SummaryPayment.total}
        currency={SummaryPayment.priceSymbol}
        textStyle={{ fontWeight: 700 }}
      />

      <SizeBox height={12} />

      <Typography.Paragraph>
        {t("agreeTermOfService", {
          ns: "sentence",
        })}
        <Link href={PAGE_ROUTES.TERM_OF_USE}>
          {" " + t("termsAndConditions")}.
        </Link>
      </Typography.Paragraph>

      <Button
        type="primary"
        size="large"
        onClick={handleCompleteCheckout}
        isFullWidth
      >
        {t("completeCheckout")}
      </Button>
      <Tour
        placement="top"
        open={open}
        onClose={() => setOpen(false)}
        steps={steps}
      />

      <p style={{ textAlign: "center" }}>
        {t("moneyBackGurantee", { ns: "sentence" })}
      </p>
    </>
  );
};

export default Checkout;
