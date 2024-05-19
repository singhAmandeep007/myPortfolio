import { useMemo, useRef, useState } from "react";
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";

import { SidebarMenu } from "@/Components/SidebarMenu";
import { ToggleTheme } from "@/Components/ToggleTheme";
import { useOnClickOutside } from "@/Hooks/useOnClickOutside";

import { Loading } from "@/Components/Loading";
import { ParticlesContainer } from "@/Components/Particles";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarNode = useRef<HTMLElement | null>(null);

  useOnClickOutside(sidebarNode, () => setIsSidebarOpen(false));

  const toggleTheme = useMemo(() => <ToggleTheme />, []);
  const particles = useMemo(() => <ParticlesContainer />, []);

  return (
    <main>
      <div className={`App ${isSidebarOpen ? "blur" : ""}`}>
        <SidebarMenu
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
          ref={sidebarNode}
        />

        <Outlet />
        {toggleTheme}
      </div>
      {particles}
    </main>
  );
};

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: "/",

          lazy: async () => {
            const { HomePage } = await import("@/Pages/HomePage");
            return {
              Component: HomePage,
            };
          },
        },
        {
          path: "/about",
          lazy: async () => {
            const { AboutPage } = await import("@/Pages/AboutPage");
            return {
              Component: AboutPage,
            };
          },
        },
        {
          path: "/articles",
          lazy: async () => {
            const { ArticlesPage } = await import("@/Pages/ArticlesPage");
            return {
              Component: ArticlesPage,
            };
          },
        },
        {
          path: "/projects",
          lazy: async () => {
            const { ProjectsPage } = await import("@/Pages/ProjectsPage");
            return {
              Component: ProjectsPage,
            };
          },
        },
      ],
    },
  ],
  {
    basename: "/myPortfolio",
  }
);

export const Router = () => (
  <RouterProvider
    router={router}
    fallbackElement={<Loading />}
  />
);
