import { getBlogById } from "@/api_service/blog.service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { Spinner } from "@/components/ui/spinner";
import { createFileRoute } from "@tanstack/react-router";
import { AlertCircleIcon } from "lucide-react";

export const Route = createFileRoute("/$blogId")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return await getBlogById(params.blogId);
  },
  pendingComponent: () => (
    <div className="flex items-center justify-center p-10 text-blue-600">
      <Spinner />
    </div>
  ),
  errorComponent: ({ error }) => (
    <div>
      <Alert variant="destructive">
        <AlertCircleIcon />
        <AlertTitle>{error.message}</AlertTitle>
        <AlertDescription>
          <p>Please verify the followings.</p>
          <ul className="list-inside list-disc text-sm">
            <li>Is your server is running</li>
            <li>Internet Connection</li>
            <li>Api endpoints</li>
            <li>Check the domains</li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  ),
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
