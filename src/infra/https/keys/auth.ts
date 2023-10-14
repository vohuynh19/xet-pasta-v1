import { createMutationKeys } from "@lukemorales/query-key-factory";
import API_SERVICES from "../services";

export type ExchangeCodeParams = {
  code: string;
  email: string;
};

export const authMutationKeys = createMutationKeys("auth", {
  logout: () => ({
    mutationKey: ["logout"],
    mutationFn: () => API_SERVICES.AUTH.logout(),
  }),
  exchangeToken: () => ({
    mutationKey: ["exchange-token"],
    mutationFn(params: ExchangeCodeParams) {
      return API_SERVICES.AUTH.exchangeToken(params.code, params.email);
    },
  }),
});
