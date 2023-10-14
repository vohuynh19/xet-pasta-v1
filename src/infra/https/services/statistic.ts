import { API_ENDPONTS } from "..";
import axiosInstance from "../axios";

const StatisticService = {
  getHomeStatistic: () =>
    axiosInstance.get<SHomeStatistic>(API_ENDPONTS.statistic.STATISTIC),
};

export default StatisticService;
