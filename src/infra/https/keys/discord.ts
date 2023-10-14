import {
    createQueryKeys,
    createMutationKeys,
  } from "@lukemorales/query-key-factory";
  
  import API_SERVICES from "../services";
  
  export const discordQueryKeys = createQueryKeys("discord", {
    verifyCode: (discordId: string) => ({
      queryKey: [discordId],
      queryFn: () => API_SERVICES.DISCORD.getVerifyCode(discordId),
    }),
  });
  