const PAGE_ROUTES = {
  HOME: "/",
  CREATE_COURSE: "/create-course",
  COURSE_LIST: "/course-list",
  COURSE_DETAIL: (id: string) => `/course-detail/${id}`,
  LESSON: (id: string) => `/lesson/${id}`,
  INSTRUCTORS: "/instructors",
  BLOG: "/blog",
  REGISTER: "/register",
  LOGIN: "/login",
  FORGOT_PASSWORD: "/forgot-password",
  TERM_OF_USE: "/term-of-use",
  PRIVACY_POLICY: "/privacy-policy",
  QUESTION: "/question",
  USER_PROFILE: (id: string) => `/profile/${id}`,
  PROFILE: {
    DASHBOARD: "/profile/dashboard",
    MY_PROFILE: "/profile",
    ENROLLED_COURSE: "/profile/enrolled-course",
    WISHLIST: "/profile/wishlist",
    REVIEWS: "/profile/review",
    ORDER_HISTORY: "/profile/order-history",
    QNA: "/profile/qna",
    SETTING: "/profile/setting",
    CONNECT_DISCORD: "/profile/connect-discord",
  },
  INSTRUCTOR_DASHBOARD: {
    DASHBOARD: "/instructor-dashboard",
    COURSES: "/instructor-dashboard/course",
    LESSONS: "/instructor-dashboard/lesson",
  }
};

export const PRIVATE_ROUTES = [
  PAGE_ROUTES.PROFILE.DASHBOARD,
  PAGE_ROUTES.PROFILE.MY_PROFILE,
  PAGE_ROUTES.PROFILE.ENROLLED_COURSE,
  PAGE_ROUTES.PROFILE.WISHLIST,
  PAGE_ROUTES.PROFILE.REVIEWS,
  PAGE_ROUTES.PROFILE.ORDER_HISTORY,
  PAGE_ROUTES.PROFILE.QNA,
  PAGE_ROUTES.PROFILE.SETTING,
  PAGE_ROUTES.INSTRUCTOR_DASHBOARD.DASHBOARD,
  PAGE_ROUTES.INSTRUCTOR_DASHBOARD.COURSES,
  PAGE_ROUTES.INSTRUCTOR_DASHBOARD.LESSONS,
];

export default PAGE_ROUTES;
