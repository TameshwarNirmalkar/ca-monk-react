import React, { memo, useCallback } from "react";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { Link, useNavigate } from "@tanstack/react-router";
// import type { BlogItemI } from "@/api_service/blog.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Trash2Icon } from "lucide-react";

import {
  deleteBlog,
  getBlogLists,
  type BlogItemI,
} from "@/api_service/blog.service";

// interface BlogListI {
//   onItemClick?: (item: BlogItemI) => void;
// }

const BlogList: React.FC = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    data: blogs,
    isLoading: blogsLoading,
    error: blogsError,
    isSuccess: blogsSuccess,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: () => getBlogLists(),
  });

  // Mutations
  const mutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      navigate({ to: "/" });
    },
  });

  const onDelete = useCallback((e: React.MouseEvent, item: BlogItemI) => {
    e.preventDefault();
    e.stopPropagation();
    mutation.mutate(item);
  }, []);

  if (blogsLoading) return <p>Loading blogs...</p>;
  if (blogsError instanceof Error) return <p>Error: {blogsError.message}</p>;

  if (blogsSuccess) {
    return (
      <>
        <div className="flex w-full max-w-md flex-col gap-6">
          <ItemGroup className="gap-4">
            {blogs?.map((blog) => (
              <Item key={blog.id} variant="outline" asChild role="listitem">
                <Link to="/$blogId" params={{ blogId: `${blog.id}` }}>
                  <ItemContent>
                    <ItemTitle className="line-clamp-1">
                      {blog.category}
                    </ItemTitle>
                    <ItemDescription>{blog.title}</ItemDescription>
                    <ItemDescription>{blog.description}</ItemDescription>
                  </ItemContent>
                  <ItemContent className="flex-none text-center">
                    <ItemDescription>
                      <span>
                        {new Date(blog.date).toLocaleDateString("en-US")}
                      </span>

                      <span>
                        <Trash2Icon
                          className="size-5 text-red-700"
                          onClick={(e) => onDelete(e, blog)}
                        />
                      </span>
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
