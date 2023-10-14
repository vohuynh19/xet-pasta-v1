export const USER_API = {
  USER: "/user",
  FIND_USERS: "/find-users",
  USER_DETAIL: (id: string) => `/user/detail/${id}`,
  OWNER_GUIDE: (guideId: string) => `/bot/owner/${guideId}`,
  INSTRUCTORS: "/user/instructor",
  LINK_INSTRUCTOR_DISCORD: "/bot/link-account",
};
