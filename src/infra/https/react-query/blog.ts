import { REACT_QUERY_ACTION_KEYS, REACT_QUERY_FILTER_KEYS } from "./common";

const key = "blog";

const COURSE_KEYS = {
  GET_LATEST_BLOG: [
    key,
    REACT_QUERY_ACTION_KEYS.GET,
    REACT_QUERY_FILTER_KEYS.GET_LATEST,
  ],
};

export default COURSE_KEYS;
