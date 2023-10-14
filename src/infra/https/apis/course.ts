const COURSE_PREFIX = "/course";
const USER_COURSE_PREFIX = "/user-course-info";
const COURSE_CATEGORY_PREFIX = "/course-category";

export const COURSE_API = {
  COURSE: `${COURSE_PREFIX}`,
  REGISTER_INSTRUCTOR: `${COURSE_PREFIX}/register-instructor`,
  COURSE_DETAIL: (id: string) => `${COURSE_PREFIX}/detail/${id}`,
  COURSE_RATE: (id: string) => `${COURSE_PREFIX}/rate/${id}`,
  ENROLL_COURSE: (id: string) => `${COURSE_PREFIX}/enroll/${id}`,
  USER_COURSE: USER_COURSE_PREFIX,
  USER_COURSE_INFO: (courseId: string) => `${USER_COURSE_PREFIX}/${courseId}`,
  USER_COURSE_INFO_ALL: `${USER_COURSE_PREFIX}/all`,
  COURSE_CATEGORY: `${COURSE_CATEGORY_PREFIX}`,
  COURSE_CATEGORY_DETAIL: (id: string) => `${COURSE_CATEGORY_PREFIX}/${id}`,
};
