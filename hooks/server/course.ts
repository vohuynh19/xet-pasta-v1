import { useMutation, useQuery } from "@tanstack/react-query";
import {
  API_SERVICES,
  REACT_QUERY_KEYS,
  courseMutationKeys,
  courseQueryKeys,
} from "src/infra/https";
import { EnrollCourse } from "src/infra/https/services/course";

// Query

export const useCourseDetailQuery = (params: { id: string }) => {
  const queryData = useQuery<Course, ApiError>(
    REACT_QUERY_KEYS.GET_COURSE_DETAIL(params.id),
    () => API_SERVICES.COURSE.getCoursesDetail(params.id)
  );
  return queryData;
};

export const useCourseDetail = (id: string) => {
  return useQuery({
    ...courseQueryKeys.detail(id),
  });
};

export const useCourses = (params: PaginationType<SCourse>) => {
  return useQuery({
    ...courseQueryKeys.list(params),
  });
};

export const useUserCourse = (id: string) => {
  return useQuery({
    ...courseQueryKeys.userCourse(id),
  });
};

export const useUserCourses = (filter: PaginationType) => {
  return useQuery({
    ...courseQueryKeys.userCourseList(filter),
  });
};

// Mutation

export const useCreateCourse = () => {
  return useMutation<any, unknown, CreateCoursePayload>({
    ...courseMutationKeys.create(),
  });
};

export const useDeleteCourse = () => {
  return useMutation<any, unknown, DeleteCoursePayload>({
    ...courseMutationKeys.delete(),
  });
};

export const useEnrollCourse = () => {
  return useMutation<any, unknown, EnrollCourse>({
    ...courseMutationKeys.enroll(),
  });
};
