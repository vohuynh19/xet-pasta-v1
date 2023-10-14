import { createQueryKeys } from "@lukemorales/query-key-factory";
import API_SERVICES from "../services";

export const statisticQueryKeys = createQueryKeys("statistic", {
  homeStatistic: () => ({
    queryKey: ["home-statistic"],
    queryFn: () => API_SERVICES.STATISTIC.getHomeStatistic(),
  }),
});
