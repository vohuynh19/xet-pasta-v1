import { useMutation, useQuery } from "@tanstack/react-query";
import {  miscMutationKeys } from "src/infra/https/keys";

export const useSendFeedback = () => {
    return useMutation<any, unknown, UserFeedbackPayload>({
      ...miscMutationKeys.sendFeedback(),
    });
  };