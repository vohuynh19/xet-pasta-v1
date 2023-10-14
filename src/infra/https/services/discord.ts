import APIS from "../apis";
import axiosInstance from "../axios";

import { usersMapping, userMapping } from "../entities/user/user.mapping";

const DiscordService = {
  getVerifyCode: async (discordId: string) => {
    return axiosInstance
      .get<SVerifyCode>(APIS.discord.VERIFY_CODE(discordId)).then((res) => res.data);
  },
};

export default DiscordService;
