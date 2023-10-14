import { REACT_QUERY_ACTION_KEYS, REACT_QUERY_FILTER_KEYS } from "./common";

const key = "COURSE";

const COURSE_KEYS = {
  GET_TOP_COURSE: [
    key,
    REACT_QUERY_ACTION_KEYS.GET,
    REACT_QUERY_FILTER_KEYS.GET_TOP,
  ],
  GET_COURSE_DETAIL: (id: string) => [key, REACT_QUERY_ACTION_KEYS.GET, id],
};

export default COURSE_KEYS;
