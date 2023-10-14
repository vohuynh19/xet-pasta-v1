const prefix = "/bot";

export const QUESTION_API = {
  GET_QUESTIONS: `${prefix}/public-questions`,
  GET_QUESTIONS_BY_GUIDE: (guideId: string) => `${prefix}/questions/${guideId}`,
  ANSWER_QUESTION: (questionId: string) => `${prefix}/answer/${questionId}`,
};
