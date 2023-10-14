const prefix = "/payment-info";

export const PAYMENT_API = {
  PAYMENT_INFO: `${prefix}`,
  PAYMENT_INFO_WITH_COURSE: (courseId: string) => `${prefix}/${courseId}`,
};
