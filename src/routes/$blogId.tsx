import { getBlogById } from "@/api_service/blog.service";
import {
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$blogId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return await getBlogById(Number(params.blogId));
  },
  pendingComponent: () => <div>Loading blog data...</div>,
  errorComponent: () => <div>Error loading blog!</div>,
});

function RouteComponent() {
  const { blogId } = Route.useParams();
  const blog = Route.useLoaderData();

  return (
    <div>
      <ItemGroup>
        <ItemContent>
          <ItemTitle>
            {blog?.title} {blogId}
          </ItemTitle>
          <ItemDescription>{blog?.content}</ItemDescription>
          <ItemDescription>
            {new Date(blog!.date).toLocaleDateString("en-US")}
          </ItemDescription>
          <ItemDescription>{blog?.category.join(", ")}</ItemDescription>
          <ItemDescription>{blog?.description}</ItemDescription>
          <ItemDescription>
            <img src={blog?.coverImage} alt={blog?.title} />
          </ItemDescription>
        </ItemContent>
      </ItemGroup>
    </div>
  );
}
