import { useMutation, useQuery } from "@tanstack/react-query";
import { sectionMutationKeys, sectionQueryKeys } from "src/infra/https";

export const useCourseSection = (
  filter: PaginationType<{ courseId: string }>
) => {
  return useQuery({
    ...sectionQueryKeys.list(filter),
  });
};

export const useCreateSection = () => {
  return useMutation<any, any, VideoPayload>({
    ...sectionMutationKeys.create(),
  });
};

export const useDeleteSection = () => {
  return useMutation<any, any, DeleteVideoPayload>({
    ...sectionMutationKeys.delete(),
  });
};
