import { REACT_QUERY_ACTION_KEYS, REACT_QUERY_FILTER_KEYS } from "./common";

const key = "Question";

const QUESTION_KEYS = {
  GET_TOP_QUESTION: [
    key,
    REACT_QUERY_ACTION_KEYS.GET,
    REACT_QUERY_FILTER_KEYS.GET_TOP,
  ],
  GET_QUESTION_DETAIL: (id: string) => [key, REACT_QUERY_ACTION_KEYS.GET, id],
};

export default QUESTION_KEYS;
