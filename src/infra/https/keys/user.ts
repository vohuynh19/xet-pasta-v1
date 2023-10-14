import {
  createQueryKeys,
  createMutationKeys,
} from "@lukemorales/query-key-factory";

import API_SERVICES from "../services";

export const userQueryKeys = createQueryKeys("user", {
  getSelf: () => ({
    queryKey: ["self"],
    queryFn: () => API_SERVICES.USER.getUser(),
  }),
  detail: (userId: string) => ({
    queryKey: [userId],
    queryFn: () => API_SERVICES.USER.getUserDetail(userId),
  }),
  list: (filters: PaginationType) => ({
    queryKey: [{ filters }],
    queryFn: () => API_SERVICES.USER.getUserList(filters),
  }),
  instructors: (filters: PaginationType) => ({
    queryKey: ["instructors", { filters }],
    queryFn: () => API_SERVICES.USER.getInstructorList(filters),
  }),
  ownerGuide: (guideId: string) => ({
    queryKey: [guideId],
    queryFn: () => API_SERVICES.USER.getOwnerOfGuide(guideId),
  }),
});

export const userMutationKeys = createMutationKeys("user", {
  registerInstructor: () => ({
    mutationKey: ["register-instructor"],
    mutationFn: () => API_SERVICES.COURSE.registerInstructor(),
  }),
  updateUserProfile: () => ({
    mutationKey: ["update-profile"],
    mutationFn: (payload: UserProfilePayload) => API_SERVICES.USER.updateUserProfile(payload),
  }),

  linkInstructorDiscord: () => ({
    mutationKey: ["link-discord"],
    mutationFn: (payload: LinkDiscordPayload) => API_SERVICES.USER.linkInstructorDiscord(payload),
  }),
});
