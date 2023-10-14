import { API_ENDPONTS } from "..";
import axiosInstance from "../axios";
import { courseCategoriesMapping } from "../entities/course/course-category.mapping";
import { mockCourses, mockCourse } from "../entities/course/course.mock";

type CourseCreateParams = {
  name: string;
  thumnail: string;
  categoryId: string;
  description: string;
  achivementDes: string;
  prerequisiteDes: string;
  price: number;
};

type CourseRateParams = {
  amount: string;
  courseId: string;
};

export type EnrollCourse = {
  courseId: string;
};

const CourseService = {
  getCourses: (): Promise<Course[]> =>
    new Promise((resolve) => {
      resolve(mockCourses.filter((_, idx) => idx < 4));
    }),
  getCoursesDetail: (id: string): Promise<Course> =>
    new Promise((resolve) => {
      resolve(mockCourse);
    }),
  getCourseDetail: (id: string) =>
    axiosInstance
      .get<SCourse>(API_ENDPONTS.course.COURSE_DETAIL(id))
      .then((res) => res.data),
  registerInstructor: () =>
    axiosInstance.post(API_ENDPONTS.course.REGISTER_INSTRUCTOR),
  getCoursePagination: (filter: PaginationType) =>
    axiosInstance
      .get<PaginationResponse<SCourse>>(API_ENDPONTS.course.COURSE, {
        params: filter,
      })
      .then((res) => ({
        ...res.data,
        data: res.data.data.map((course) => ({
          ...course,
          key: course._id,
        })),
      })),
  createCourse: (params: CourseCreateParams) =>
    axiosInstance.post(API_ENDPONTS.course.COURSE, { ...params }),
  deleteCourses: (params: DeleteCoursePayload) =>
    axiosInstance.delete(API_ENDPONTS.course.COURSE, { data: params }),
  rateCourse: (params: CourseRateParams) =>
    axiosInstance.post(API_ENDPONTS.course.COURSE_RATE(params.courseId), {
      amount: params.amount,
    }),
  enrollCourse: (params: EnrollCourse) =>
    axiosInstance.post(API_ENDPONTS.course.ENROLL_COURSE(params.courseId)),

  getCourseCategory: () =>
    axiosInstance
      .get<PaginationResponse<SCourseCategory>>(
        API_ENDPONTS.course.COURSE_CATEGORY
      )
      .then((res) => ({
        total: res.data.total,
        data: courseCategoriesMapping(res.data.data),
      })),
  createCourseCategory: (payload: CourseCategoryPayload) =>
    axiosInstance.post(API_ENDPONTS.course.COURSE_CATEGORY, { ...payload }),
  updateCourseCategory: (payload: CourseCategoryPayload) =>
    axiosInstance.patch(
      `${API_ENDPONTS.course.COURSE_CATEGORY}/${payload.id}`,
      {
        name: payload.name,
      }
    ),

  userCourse: (id: string) =>
    axiosInstance.get(API_ENDPONTS.course.USER_COURSE_INFO(id)),
  userCoursesPagination: (filter: PaginationType) =>
    axiosInstance
      .get<PaginationResponse<SUserCourseType>>(
        API_ENDPONTS.course.USER_COURSE,
        {
          params: { ...filter },
        }
      )
      .then((res) => res.data),
};

export default CourseService;
