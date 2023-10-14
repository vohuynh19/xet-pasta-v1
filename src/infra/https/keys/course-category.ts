import {
  createMutationKeys,
  createQueryKeys,
} from "@lukemorales/query-key-factory";

import API_SERVICES from "../services";

export const courseCategoryQueryKeys = createQueryKeys("course-category", {
  get: () => ({
    queryKey: ["get"],
    queryFn: () => API_SERVICES.COURSE.getCourseCategory(),
  }),
});

export const courseCategoryMutationKeys = createMutationKeys(
  "course-category",
  {
    create: () => ({
      mutationKey: ["create"],
      mutationFn: (payload: CreateCoursePayload) =>
        API_SERVICES.COURSE.createCourseCategory(payload),
    }),
    update: () => ({
      mutationKey: ["update"],
      mutationFn: (payload: CreateCoursePayload) =>
        API_SERVICES.COURSE.updateCourseCategory(payload),
    }),
  }
);
