import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">
        Welcome to the Home Page of CA Monk
      </h1>
      <p>This is the main landing page of the application.</p>
    </div>
  );
}
