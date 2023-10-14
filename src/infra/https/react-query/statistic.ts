import { REACT_QUERY_ACTION_KEYS } from "./common";

const key = "STATISTIC";

enum ALIAS {
  HOME = "HOME",
}

const COURSE_KEYS = {
  GET_HOME_STATISTIC: [key, ALIAS.HOME, REACT_QUERY_ACTION_KEYS.GET],
};

export default COURSE_KEYS;
