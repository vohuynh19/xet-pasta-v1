import { blogsMapping } from "../entities/blog/blog.map";
import { mockSBlogs } from "../entities/blog/blog.mock";

const BlogService = {
  getLatestBlog: (): Promise<Blog[]> =>
    new Promise((resolve) => {
      const apiResponse = mockSBlogs;
      resolve(blogsMapping(apiResponse));
    }),
};

export default BlogService;
