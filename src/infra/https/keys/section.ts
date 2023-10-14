import {
  createMutationKeys,
  createQueryKeys,
} from "@lukemorales/query-key-factory";
import API_SERVICES from "../services";

export const sectionQueryKeys = createQueryKeys("section", {
  list: (filter: PaginationType) => ({
    queryKey: [filter],
    queryFn: () => API_SERVICES.SECTION.get(filter),
  }),
});

export const sectionMutationKeys = createMutationKeys("section", {
  create: () => ({
    mutationKey: ["create"],
    mutationFn: (payload: VideoPayload) => API_SERVICES.SECTION.create(payload),
  }),
  delete: () => ({
    mutationKey: ["delete"],
    mutationFn: (sectionId: string) => API_SERVICES.SECTION.delete(sectionId),
  }),
});
