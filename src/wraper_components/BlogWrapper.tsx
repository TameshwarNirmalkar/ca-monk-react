import { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBlogById, getBlogLists } from "../api_service/blog.service";
import { Button } from "@/components/ui/button";

export default memo(function BlogWrapper() {
  const {
    data: blogs,
    isLoading: blogsLoading,
    error: blogsError,
    isSuccess: blogsSuccess,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getBlogLists(),
  });

  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["blogs_by_id", 1],
    queryFn: () => getBlogById(1),
  });

  if (blogsLoading) return <p>Loading blogs...</p>;
  if (blogsError instanceof Error) return <p>Error: {blogsError.message}</p>;

  if (isSuccess) {
    return (
      <>
        <ul>
          {blogs?.map((blog) => (
            <li key={blog.id}>
              {blog.title} ({blog.date})
            </li>
          ))}
          <Button variant="default" size="sm">
            Read More
          </Button>
        </ul>

        <ul>
          <li>
            <div>Blog Title : {data?.title}</div>
            Blog Content : {data?.content}
            <br />
            Blog Cover Image : <img src={data?.coverImage} alt="Cover" />
          </li>
        </ul>
      </>
    );
  }
});
