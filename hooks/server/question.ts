import { useMutation, useQuery } from "@tanstack/react-query";
import {  questionMutationKeys, questionQueryKeys } from "src/infra/https/keys";

export const useQuestionPublic = (params: PaginationType<SQuestion>) => {
  return useQuery({
    ...questionQueryKeys.list(params),
  });
};

export const useQuestionWithGuideId = (params: PaginationType<SQuestion>, guideId: string) => {
  return useQuery({
    ...questionQueryKeys.listWithGuideID(params, guideId),
  });
};

export const useAnswerQuestion = () => {
  return useMutation<any, unknown, AnswerQuestionPayload>({
    ...questionMutationKeys.answer(),
  });
};