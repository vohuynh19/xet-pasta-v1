import { useMutation, useQuery } from "@tanstack/react-query";
import { discordQueryKeys } from "src/infra/https/keys";

export const useGetVerifyCode = (discordId: string) => {
    return useQuery({
      retry: 1,
      ...discordQueryKeys.verifyCode(discordId),
    });
  };
  