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
    return await getBlogById(params.blogId);
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
          <ItemDescription>
            <img src={blog?.coverImage} alt={blog?.title} />
          </ItemDescription>
          <ItemTitle>{blog?.title}</ItemTitle>

          <ItemDescription>
            {blog?.category} |{" "}
            {new Date(blog!.date).toLocaleDateString("en-US")}
          </ItemDescription>
          <ItemDescription>{blog?.category.join(", ")}</ItemDescription>
          <ItemDescription>{blog?.description}</ItemDescription>
          <ItemDescription>{blog?.content}</ItemDescription>
        </ItemContent>
      </ItemGroup>
    </div>
  );
}
