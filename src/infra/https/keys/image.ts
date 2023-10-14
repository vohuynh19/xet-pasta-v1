import { createMutationKeys } from "@lukemorales/query-key-factory";
import API_SERVICES from "../services";

export const imageMutationKeys = createMutationKeys("image", {
  getPresignedLink: () => ({
    mutationKey: ["get-presign-link"],
    mutationFn: (fileType: string) =>
      API_SERVICES.IMAGE.getPresignedLink(fileType).then((e) => e.data),
  }),
});
