import { useQuery } from "@tanstack/react-query";
import { statisticQueryKeys } from "src/infra/https";

export const useHomeStatistic = () => {
  return useQuery({
    ...statisticQueryKeys.homeStatistic(),
  });
};
