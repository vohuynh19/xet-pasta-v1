import { useMutation, useQuery } from "@tanstack/react-query";
import { userMutationKeys, userQueryKeys } from "src/infra/https/keys";

export const useMyProfile = () => {
  return useQuery({
    retry: 1,
    ...userQueryKeys.getSelf(),
  });
};

export const useUserDetail = (id: string) => {
  return useQuery({
    ...userQueryKeys.detail(id),
  });
};

export const useOwernOfGuide = (guideId: string) => {
  return useQuery({
    ...userQueryKeys.ownerGuide(guideId),
  });
};

export const useUsers = (filter: PaginationType) => {
  return useQuery({
    ...userQueryKeys.list(filter),
  });
};

export const useInstructors = (filter: PaginationType) => {
  return useQuery({
    ...userQueryKeys.instructors(filter),
  });
};

export const useRegisterInstructor = () => {
  return useMutation({ ...userMutationKeys.registerInstructor() });
};

export const useUpdateProfile = () => {
  return useMutation<any, any, UserProfilePayload>({
    ...userMutationKeys.updateUserProfile(),
  });
};

export const useLinkInstructorDiscord = () => {
  return useMutation<any, any, LinkDiscordPayload>({
    ...userMutationKeys.linkInstructorDiscord(),
  });
};
