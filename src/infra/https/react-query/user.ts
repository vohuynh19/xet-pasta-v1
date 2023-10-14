import { REACT_QUERY_ACTION_KEYS, REACT_QUERY_FILTER_KEYS } from "./common";

const key = "USER";

const USER_KEYS = {
  GET_USERS: [
    key,
    REACT_QUERY_ACTION_KEYS.GET,
    REACT_QUERY_FILTER_KEYS.GET_LIST,
  ],
  GET_USER_DETAIL: (id: string) => [key, REACT_QUERY_ACTION_KEYS.GET, id],
};

export default USER_KEYS;
