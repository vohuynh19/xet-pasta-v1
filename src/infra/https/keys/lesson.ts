import {
  createMutationKeys,
  createQueryKeys,
} from "@lukemorales/query-key-factory";
import API_SERVICES from "../services";

export const lessonQueryKeys = createQueryKeys("lesson", {
  list: (filter: PaginationType) => ({
    queryKey: [{ filter }],
    queryFn: () => API_SERVICES.LESSON.getListLesson(filter),
  }),
  detail: (id: string) => ({
    queryKey: [id],
    queryFn: () => API_SERVICES.LESSON.getLessonDetail(id),
  }),
  courseVideo: (id: string) => ({
    queryKey: ["course", id],
    queryFn: () => API_SERVICES.LESSON.getCourseLessons(id),
  }),
});

export const lessonMutationKeys = createMutationKeys("lesson", {
  create: () => ({
    mutationKey: ["create"],
    mutationFn: (payload: VideoPayload) =>
      API_SERVICES.LESSON.createLesson(payload),
  }),
  delete: () => ({
    mutationKey: ["delete"],
    mutationFn: (payload: DeleteVideoPayload) =>
      API_SERVICES.LESSON.deleteLesson(payload),
  }),
});
