import { useMutation, useQuery } from "@tanstack/react-query";
import { lessonMutationKeys, lessonQueryKeys } from "src/infra/https";

export const useCourseLessons = (id: string) => {
  return useQuery({
    ...lessonQueryKeys.courseVideo(id),
  });
};

export const useLesson = (id: string) => {
  return useQuery({
    ...lessonQueryKeys.detail(id),
  });
};

export const useLessons = (filter: PaginationType) => {
  return useQuery({
    ...lessonQueryKeys.list(filter),
  });
};

export const useCreateLesson = () => {
  return useMutation<any, any, VideoPayload>({
    ...lessonMutationKeys.create(),
  });
};

export const useDeleteLessons = () => {
  return useMutation<any, any, DeleteVideoPayload>({
    ...lessonMutationKeys.delete(),
  });
};
