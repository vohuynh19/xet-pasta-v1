export const courseCategoryMapping = (c: SCourseCategory): CourseCategory => {
  return {
    id: c._id,
    name: c.name,
    key: c._id,
  };
};

export const courseCategoriesMapping = (
  cs: SCourseCategory[]
): CourseCategory[] => {
  return cs.map((c) => courseCategoryMapping(c));
};
