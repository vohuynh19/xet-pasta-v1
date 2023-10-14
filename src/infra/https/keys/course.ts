import {
  createMutationKeys,
  createQueryKeys,
} from "@lukemorales/query-key-factory";

import API_SERVICES from "../services";
import { EnrollCourse } from "../services/course";

export const courseQueryKeys = createQueryKeys("course", {
  list: (filters: PaginationType<SCourse>) => ({
    queryKey: [{ filters }],
    queryFn: () => API_SERVICES.COURSE.getCoursePagination(filters),
  }),
  userCourse: (id: string) => ({
    queryKey: ["user-course", id],
    queryFn: () => API_SERVICES.COURSE.userCourse(id),
  }),
  userCourseList: (filters: PaginationType<SCourse>) => ({
    queryKey: ["user-course", { filters }],
    queryFn: () => API_SERVICES.COURSE.userCoursesPagination(filters),
  }),
  detail: (id: string) => ({
    queryKey: [id],
    queryFn: () => API_SERVICES.COURSE.getCourseDetail(id),
  }),
});

export const courseMutationKeys = createMutationKeys("course", {
  create: () => ({
    mutationKey: ["create"],
    mutationFn: (payload: CreateCoursePayload) =>
      API_SERVICES.COURSE.createCourse(payload),
  }),
  delete: () => ({
    mutationKey: ["delete"],
    mutationFn: (payload: DeleteCoursePayload) =>
      API_SERVICES.COURSE.deleteCourses(payload),
  }),
  enroll: () => ({
    mutationKey: ["enroll"],
    mutationFn: (payload: EnrollCourse) =>
      API_SERVICES.COURSE.enrollCourse(payload),
  }),
});
