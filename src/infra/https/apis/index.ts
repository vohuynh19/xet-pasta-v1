import { COURSE_API } from "./course";
import { BLOG_API } from "./blog";
import { STATISTIC_API } from "./statistic";
import { INSTRUCTOR_API } from "./instructor";
import { AUTH_API } from "./auth";
import { USER_API } from "./user";
import { QUESTION_API } from "./question";
import { IMAGE_API } from "./image";
import { VIDEO_API } from "./video";
import { MISC_API } from "./misc";
import { DISCORD_API } from "./discord";

const APIS = {
  course: COURSE_API,
  blog: BLOG_API,
  statistic: STATISTIC_API,
  instructor: INSTRUCTOR_API,
  auth: AUTH_API,
  user: USER_API,
  discord: DISCORD_API,
  question:QUESTION_API,
  misc:MISC_API,
  image: IMAGE_API,
  video: VIDEO_API,
};

export default APIS;
