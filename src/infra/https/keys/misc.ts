import {
    createMutationKeys,
  } from "@lukemorales/query-key-factory";
  
  import API_SERVICES from "../services";
  
  export const miscMutationKeys = createMutationKeys("feedback", {
    sendFeedback: () => ({
      mutationKey: ["create"],
      mutationFn: (payload: UserFeedbackPayload) =>
        API_SERVICES.MISC.sendFeedback(payload),
    }),
  });
  