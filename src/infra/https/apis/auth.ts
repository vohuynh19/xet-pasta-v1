const prefix = "/auth";

export const AUTH_API = {
  LOGOUT: `${prefix}/logout`,
  REFRESH_TOKEN: "${prefix}/refresh-token",
  LOGIN: (redirectUri: string) => `${prefix}/login?redirectUri=${redirectUri}`,
  EXCHANGE_TOKEN: (code: string, email: string) =>
    `${prefix}/exchange-token?code=${code}&email=${email}`,
};
