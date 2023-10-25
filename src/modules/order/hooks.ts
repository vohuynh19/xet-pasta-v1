import { useMutation, useQuery } from "@tanstack/react-query";
import moment from "moment";

import { OrderSchema } from "./schema";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import {
  firestoreIns,
  getCollection,
  orderCollection,
} from "src/infra/firebase";
import { axiosInstance } from "src/infra/https";

type OrderFilterType =
  | "ALL"
  | "UNRESOLVE_ORDER"
  | "LATEST_10"
  | "ALL_DONE_TODAY"
  | "ALL_DONE_MORNING"
  | "ALL_DONE_EVENING";

export const getOrderQueryKey = (type: OrderFilterType) => ["order", type];
export const getOrderFilterQueryKey = (
  type: OrderFilterType,
  startDate: string,
  endDate: string
) => ["order", type, startDate, endDate];

const createOrder = ({
  dishes,
  totalPrice,
  demographics,
  status,
  paymentMethod,
  imageUrl = "",
}: OrderSchema) =>
  addDoc(orderCollection, {
    status,
    dishes,
    totalPrice,
    demographics,
    paymentMethod,
    imageUrl,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

export const useCreateOrder = () => {
  const { mutateAsync, isLoading, error } = useMutation(createOrder);
  return {
    createOrder: mutateAsync,
    isLoading,
    error,
  };
};

const updateOrder = ({
  id,
  updateInfo,
}: {
  id: string;
  updateInfo: Partial<OrderSchema>;
}) =>
  updateDoc(doc(firestoreIns, getCollection("orders"), id), {
    ...updateInfo,
    updatedAt: new Date().toISOString(),
  });

export const useUpdateOrder = () => {
  const { mutateAsync, isLoading, error } = useMutation(updateOrder);
  return {
    updateOrder: mutateAsync,
    isLoading,
    error,
  };
};

export const useOrders = (type: OrderFilterType, fetchOnMount = true) => {
  const request = async () => {
    switch (type) {
      case "LATEST_10":
        return getDocs(
          query(orderCollection, orderBy("createdAt", "desc"), limit(10))
        ).then((data) => {
          return data.docs
            .map(
              (val) =>
                ({
                  ...val.data(),
                  id: val.id,
                } as OrderSchema)
            )
            .filter((order) => {
              const orderTime = moment(
                moment(order.createdAt).format("YYYY-MM-DD")
              );
              const nowTime = moment(moment().format("YYYY-MM-DD"));
              return nowTime.diff(orderTime, "day") === 0;
            });
        });

      case "ALL_DONE_MORNING":
        return getDocs(
          query(orderCollection, orderBy("createdAt", "desc"), limit(200))
        ).then((data) => {
          return data.docs
            .map(
              (val) =>
                ({
                  ...val.data(),
                  id: val.id,
                } as OrderSchema)
            )
            .filter((order) => {
              const orderDate = moment(
                moment(order.createdAt).format("YYYY-MM-DD")
              );
              const nowDate = moment(moment().format("YYYY-MM-DD"));

              const orderTime = moment(order.createdAt);
              const maxTime = moment(
                `${moment(order.createdAt).format("YYYY-MM-DD")} 11:00`
              );

              return (
                nowDate.diff(orderDate, "day") === 0 &&
                maxTime.isAfter(orderTime) &&
                order.status === "DONE"
              );
            });
        });

      case "ALL_DONE_EVENING":
        return getDocs(
          query(orderCollection, orderBy("createdAt", "desc"), limit(200))
        ).then((data) => {
          return data.docs
            .map(
              (val) =>
                ({
                  ...val.data(),
                  id: val.id,
                } as OrderSchema)
            )
            .filter((order) => {
              const orderDate = moment(
                moment(order.createdAt).format("YYYY-MM-DD")
              );
              const nowDate = moment(moment().format("YYYY-MM-DD"));

              const minTime = moment(
                `${moment(order.createdAt).format("YYYY-MM-DD")} 15:00`
              );
              const orderTime = moment(order.createdAt);
              const maxTime = moment(
                `${moment(order.createdAt).format("YYYY-MM-DD")} 23:00`
              );

              return (
                nowDate.diff(orderDate, "day") === 0 &&
                minTime.isBefore(orderTime) &&
                maxTime.isAfter(orderTime) &&
                order.status === "DONE"
              );
            });
        });

      case "ALL_DONE_TODAY":
        return getDocs(
          query(orderCollection, orderBy("createdAt", "desc"), limit(200))
        ).then((data) => {
          return data.docs
            .map(
              (val) =>
                ({
                  ...val.data(),
                  id: val.id,
                } as OrderSchema)
            )
            .filter((order) => {
              const orderDate = moment(
                moment(order.createdAt).format("YYYY-MM-DD")
              );
              const nowDate = moment(moment().format("YYYY-MM-DD"));

              return (
                nowDate.diff(orderDate, "day") === 0 && order.status === "DONE"
              );
            });
        });

      case "ALL":
        return getDocs(
          query(orderCollection, orderBy("createdAt", "desc"), limit(200))
        ).then((data) => {
          return data.docs.map(
            (val) =>
              ({
                ...val.data(),
                id: val.id,
              } as OrderSchema)
          );
        });

      default:
        throw "Not supported";
    }
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryFn: request,
    queryKey: getOrderQueryKey(type),
    enabled: fetchOnMount,
  });

  return {
    orders: data,
    isLoading,
    error,
    refetch,
  };
};

function removeDuplicates(records: OrderSchema[]): OrderSchema[] {
  const uniqueIds = new Set<string>();
  const result: OrderSchema[] = [];

  for (const record of records) {
    if (!uniqueIds.has(record.id || "")) {
      uniqueIds.add(record.id || "");
      result.push(record);
    }
  }

  return result;
}

export const useOrdersFilter = (
  type: OrderFilterType,
  startDate: string,
  endDate: string,
  fetchOnMount = true
) => {
  const request = async () => {
    const data = (await axiosInstance
      .post("/api/get-order", {
        firebaseCreatedAt: {
          $gte: startDate,
          $lte: endDate,
        },
      })
      .then((res) =>
        res.data.map((record: any) => ({
          ...record,
          createdAt: record.firebaseCreatedAt,
          updatedAt: record.firebaseUpdatedAt,
        }))
      )) as OrderSchema[];

    const fil = data.filter((record) => record.status === "DONE");

    return removeDuplicates(fil);
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryFn: request,
    queryKey: getOrderFilterQueryKey(type, startDate, endDate),
    enabled: fetchOnMount,
  });

  return {
    orders: data,
    isLoading,
    error,
    refetch,
  };
};
