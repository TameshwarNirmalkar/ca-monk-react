import * as React from "react";
import { Outlet, createRootRoute, Link } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
// import type { BlogItemI } from "@/api_service/blog.service";
import BlogList from "@/wraper_components/BlogList";
import { Button } from "@/components/ui/button";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <React.Fragment>
      <div className="flex flex-col min-h-screen">
        <header className="bg-blue-200 border-b px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="text-xl font-bold text-blue-600">BrandLogo</div>

            <nav>
              <ul className="flex space-x-8 font-medium text-gray-600">
                <li className="py-2">
                  <Link to="/">Home</Link>
                </li>
                <li className="py-2">
                  <Link to="/about">About</Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <div className="flex flex-1 flex-col md:flex-row">
          <aside className="bg-gray-100 w-full md:w-80 p-2 border-r">
            <BlogList />
          </aside>

          <main className="flex-1 p-6 bg-white">
            <div className="flex justify-end">
              <Link to="/addblog">
                <Button variant="default">Add New Blog</Button>
              </Link>
            </div>
            <Outlet />
          </main>
        </div>

        <footer className="bg-gray-800 p-4 text-white text-center">
          © 2026 My Company
          <TanStackRouterDevtools />
        </footer>
      </div>
    </React.Fragment>
  );
}
