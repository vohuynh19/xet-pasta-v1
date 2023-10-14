type Course = {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  thumbnailUrl: string;
  author: User;
  avgRating: number;
  categories: CourseCategory[];

  // New Add
  lastUpdate: string;
  price: string;
  difficultLevel: string;
  numberOfStudent: number;
  aboutCourse: string;
  whatWillLearn: string;
  courseTopic: CourseTopic[];

  materialsIncluded: string;
  requirements: string;
  targetedAudience: string;
};

type SCourse = {
  _id: string;
  teacherId: string;
  teacherName: string;
  name: string;
  description: string;
  shortDescription: string;
  achivementDes: string;
  prerequisiteDes: string;
  rating: number;
  price: number;
  totalDuration: number;
  numberEnrolled: number;
  isPublish: boolean;
  key?: string;
  categoryInfo?: SCourseCategory[];
  category?: SCourseCategory;
  thumnail: string;
  createdAt: string;
  updatedAt: string;

  // Detail
  averageRate?: string;
  totalUserEnrolled?: string;
  sections: SSection[];
  courseIntro: string;
};
