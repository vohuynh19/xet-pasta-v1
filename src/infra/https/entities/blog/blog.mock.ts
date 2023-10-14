import moment from "moment";

export const mockBlogs: Blog[] = [
  {
    id: "blog1",
    createdAt: moment().toISOString(),
    updatedAt: moment().toISOString(),
    title: "Amet minim mollit non deserunt ullamco est sit aliqua dolor.",
  },
  {
    id: "blog2",
    createdAt: moment().toISOString(),
    updatedAt: moment().toISOString(),
    title: "Velit officia consequat duis enim velit mollit. Exercitation.",
  },
  {
    id: "blog3",
    createdAt: moment().toISOString(),
    updatedAt: moment().toISOString(),
    title: "Exercitation veniam consequat sunt nostrud amet.",
  },
];

export const mockSBlogs: SBlog[] = [
  {
    _id: "blog1",
    _createdAt: moment().toISOString(),
    _updatedAt: moment().toISOString(),
    title: "Amet minim mollit non deserunt ullamco est sit aliqua dolor.",
  },
  {
    _id: "blog2",
    _createdAt: moment().toISOString(),
    _updatedAt: moment().toISOString(),
    title: "Velit officia consequat duis enim velit mollit. Exercitation.",
  },
  {
    _id: "blog3",
    _createdAt: moment().toISOString(),
    _updatedAt: moment().toISOString(),
    title: "Exercitation veniam consequat sunt nostrud amet.",
  },
];
