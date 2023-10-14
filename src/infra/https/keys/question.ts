import {
    createMutationKeys,
    createQueryKeys,
  } from "@lukemorales/query-key-factory";
  
  import API_SERVICES from "../services";
  
  export const questionQueryKeys = createQueryKeys("question", {
    list: (filters: PaginationType<SQuestion>) => ({
      queryKey: [{ filters }],
      queryFn: () => API_SERVICES.QUESTION.getQuestionPagination(filters),
    }),

    listWithGuideID: (filters: PaginationType<SQuestion>, guideId: string) => ({
      queryKey: [{ filters }],
      queryFn: () => API_SERVICES.QUESTION.getQuestionPaginationWithGuideId(filters, guideId),
    }),
  });
  
  export const questionMutationKeys = createMutationKeys("question", {
    answer: () => ({
      mutationKey: ["update"],
      mutationFn: (payload: AnswerQuestionPayload) =>
        API_SERVICES.QUESTION.answerQuestion(payload),
    }),
  });
  