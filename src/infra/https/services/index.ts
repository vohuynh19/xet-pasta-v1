import CourseService from "./course";
import BlogService from "./blog";
import StatisticService from "./statistic";
import InstructorService from "./instructor";
import AuthService from "./auth";
import UserService from "./user";
import QuestionService from "./question";
import ImageService from "./image";
import LessonService from "./lesson";
import SectionService from "./section";
import MiscService from "./misc";
import DiscordService from "./discord";

const API_SERVICES = {
  COURSE: CourseService,
  BLOG: BlogService,
  STATISTIC: StatisticService,
  INSTRUCTOR: InstructorService,
  AUTH: AuthService,
  USER: UserService,
  DISCORD: DiscordService,
  QUESTION: QuestionService,
  IMAGE: ImageService,
  LESSON: LessonService,
  SECTION: SectionService,
  MISC: MiscService,
};

export default API_SERVICES;
