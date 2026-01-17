import React, { memo } from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { Link } from "@tanstack/react-router";
// import type { BlogItemI } from "@/api_service/blog.service";
import { useQuery } from "@tanstack/react-query";
import { getBlogLists } from "@/api_service/blog.service";

// interface BlogListI {
//   onItemClick?: (item: BlogItemI) => void;
// }

const BlogList: React.FC = () => {
  const {
    data: blogs,
    isLoading: blogsLoading,
    error: blogsError,
    isSuccess: blogsSuccess,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getBlogLists(),
  });

  // const onItemClickHandler = useCallback((item: BlogItemI) => {
  //   onItemClick(item);
  // }, []);

  if (blogsLoading) return <p>Loading blogs...</p>;
  if (blogsError instanceof Error) return <p>Error: {blogsError.message}</p>;

  if (blogsSuccess) {
    return (
      <>
        <div className="flex w-full max-w-md flex-col gap-6">
          <ItemGroup className="gap-4">
            {blogs?.map((blog) => (
              <Item key={blog.title} variant="outline" asChild role="listitem">
                <Link to="/$blogId" params={{ blogId: `${blog.id}` }}>
                  <ItemContent>
                    <ItemTitle className="line-clamp-1">{blog.title}</ItemTitle>
                    <ItemDescription>{blog.description}</ItemDescription>
                  </ItemContent>
                  <ItemContent className="flex-none text-center">
                    <ItemDescription>
                      {new Date(blog.date).toLocaleDateString("en-US")}
                    </ItemDescription>
                  </ItemContent>
                </Link>
              </Item>
            ))}
          </ItemGroup>
        </div>
      </>
    );
  }
};

export default memo(BlogList);
