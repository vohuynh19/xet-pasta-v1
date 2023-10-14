const prefix = "/video";

export const VIDEO_API = {
  VIDEO_DETAIL: (videoId: string) => `${prefix}/${videoId}`,
  COURSE_VIDEO: (courseId: string) => `${prefix}/course/${courseId}`,
  CREATE_VIDEO_FORM: `${prefix}/create-form`,
  VIDEO: `${prefix}`,
  VIDEO_SECTION: `${prefix}/section`,
  VIDEO_SECTION_DETAIL: (sectionId: string) => `${prefix}/section/${sectionId}`,
};
