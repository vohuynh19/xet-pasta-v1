import { API_ENDPONTS } from "..";
import axiosInstance from "../axios";

const QuestionService = {
    getQuestionPagination: (filter: PaginationType) =>
    axiosInstance
      .get<PaginationResponse<SQuestion>>(API_ENDPONTS.question.GET_QUESTIONS, {
        params: filter,
      })
      .then((res) => ({
        ...res.data,
        data: res.data.data.map((question) => ({
          ...question,
          key: question._id,
        })),
      })),

      getQuestionPaginationWithGuideId: (filter: PaginationType, guideId: string) =>
      axiosInstance
        .get<PaginationResponse<SQuestion>>(API_ENDPONTS.question.GET_QUESTIONS_BY_GUIDE(guideId), {
          params: filter,
        })
        .then((res) => ({
          ...res.data,
          data: res.data.data.map((question) => ({
            ...question,
            key: question._id,
          })),
        })),

    answerQuestion: (payload: AnswerQuestionPayload) =>
    axiosInstance.post(
      `${API_ENDPONTS.question.ANSWER_QUESTION(payload.questionId)}`,
      {
        answer: payload.answer,
      }
    ),
};

export default QuestionService;
