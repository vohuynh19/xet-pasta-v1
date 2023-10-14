import { API_ENDPONTS } from "..";
import axiosInstance from "../axios";

const LessonService = {
  getListLesson: (filter: PaginationType) =>
    axiosInstance
      .get<PaginationResponse<SLesson>>(API_ENDPONTS.video.VIDEO, {
        params: {
          ...filter,
        },
      })
      .then((res) => res.data),
  getLessonDetail: (id: string) =>
    axiosInstance
      .get<SLesson>(API_ENDPONTS.video.VIDEO_DETAIL(id))
      .then((d) => d.data),
  getCourseLessons: (courseId: string) =>
    axiosInstance
      .get<SLesson[]>(API_ENDPONTS.video.COURSE_VIDEO(courseId))
      .then((d) => d.data),
  createLesson: (payload: VideoPayload) =>
    axiosInstance.post(API_ENDPONTS.video.VIDEO, { ...payload }),
  deleteLesson: (payload: DeleteVideoPayload) =>
    axiosInstance.delete(API_ENDPONTS.video.VIDEO, {
      data: { ...payload },
    }),
};

export default LessonService;
