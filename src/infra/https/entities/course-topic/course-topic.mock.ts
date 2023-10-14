import { mockCourseVideos } from "../course-lesson/course-lesson.mock";

export const mockCourseTopic: CourseTopic = {
    id: "1",
    title: "Course Topic 1",
    summary: "Test video 1",
    courseLessons: mockCourseVideos
  };
  
  export const mockCourseTopics: CourseTopic[] = [
    {
        id: "1",
        title: "Course Topic 1",
        summary: "Test video 1",
        courseLessons: mockCourseVideos,
    },
    {
        id: "2",
        title: "Course Topic 2",
        summary: "Test video 2",
        courseLessons: mockCourseVideos,
    }
  ];
  