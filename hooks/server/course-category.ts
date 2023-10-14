import { useMutation, useQuery } from "@tanstack/react-query";
import {
  courseCategoryMutationKeys,
  courseCategoryQueryKeys,
} from "src/infra/https/keys/course-category";

export const useCourseCategory = () => {
  return useQuery({
    ...courseCategoryQueryKeys.get(),
  });
};

export const useCreateCourseCategory = () => {
  return useMutation<any, unknown, CourseCategoryPayload>({
    ...courseCategoryMutationKeys.create(),
  });
};

export const useUpdateCourseCategory = () => {
  return useMutation<any, unknown, CourseCategoryPayload>({
    ...courseCategoryMutationKeys.update(),
  });
};
