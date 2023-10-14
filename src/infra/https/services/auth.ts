import APIS from "../apis";
import axiosInstance from "../axios";
import { userMapping } from "../entities/user/user.mapping";

const AuthService = {
  logout: () => axiosInstance.get(APIS.auth.LOGOUT),
  refreshToken: () => axiosInstance.post(APIS.auth.REFRESH_TOKEN),
  login: (redirectUri: string): Promise<void> =>
    axiosInstance.get(APIS.auth.LOGIN(redirectUri)),
  exchangeToken: (code: string, email: string) =>
    axiosInstance
      .post<SUser>(APIS.auth.EXCHANGE_TOKEN(code, email))
      .then((res) => userMapping(res.data)),
};

export default AuthService;
