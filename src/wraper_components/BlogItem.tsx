import React, { memo } from "react";
import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "../api_service/blog.service";

const BlogItem: React.FC = () => {
  const { data, isLoading, error, isSuccess } = useQuery({
    queryKey: ["blogs_by_id", 1],
    queryFn: () => getBlogById(1),
  });

  if (isLoading) return <p>Loading blogs posts...</p>;
  if (error instanceof Error) return <p>Error: {error.message}</p>;

  if (isSuccess) {
    return (
      <>
        <div>Blog Title : {data?.title}</div>
        Blog Content : {data?.content}
        <br />
        Blog Cover Image : <img src={data?.coverImage} alt="Cover" />
      </>
    );
  }
};

export default memo(BlogItem);
