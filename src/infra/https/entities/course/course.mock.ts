import { userMock } from "../user/user.mock";
import { mockCourseTopics } from "../course-topic/course-topic.mock";
import { mockCourseCategories } from "./course-category.mock";

export const mockCourse: Course = {
  id: "1",
  name: "Unity Beginners – Hướng Dẫn Làm Game 2D Bắn Súng Top-Down",
  description: "",
  thumbnailUrl: "https://vicodemy.com/wp-content/uploads/2023/03/Huong-dan-lam-game-768x432.png",
  author: userMock,
  avgRating: 4,
  categories: mockCourseCategories,
  lastUpdate: "Yesterday",
  price: "Free",
  numberOfStudent: 6,
  difficultLevel: "Easy",
  aboutCourse: "Courses Description Courses Description Courses Description 1",
  whatWillLearn: "CPPDD DDS",
  courseTopic: mockCourseTopics,
  materialsIncluded: "Test",
  requirements: "Test",
  targetedAudience: "Test",
  shortDescription: ""
};

export const mockCourses: Course[] = [
  {
    ...mockCourse,
    id: "1",
    name: "Unity Beginners – Hướng Dẫn Làm Game 2D Bắn Súng Top-Down 1",
  },
  {
    ...mockCourse,
    id: "2",
    name: "Unity Beginners – Hướng Dẫn Làm Game 2D Bắn Súng Top-Down 2",
  },
  {
    ...mockCourse,
    id: "3",
    name: "Unity Beginners – Hướng Dẫn Làm Game 2D Bắn Súng Top-Down 3",
  },
  {
    ...mockCourse,
    id: "4",
    name: "Unity Beginners – Hướng Dẫn Làm Game 2D Bắn Súng Top-Down 4",
  },
  {
    ...mockCourse,
    id: "5",
    name: "Unity Beginners – Hướng Dẫn Làm Game 2D Bắn Súng Top-Down 5",
  },
  {
    ...mockCourse,
    id: "6",
    name: "Unity Beginners – Hướng Dẫn Làm Game 2D Bắn Súng Top-Down 6",
  },
];
