import Dashboard from "@/pages/dashboard";
import LoginPage from "@/pages/login/Login";
import { createBrowserRouter, RouterProvider } from "react-router";

export default function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },

    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);

  return <RouterProvider router={router} />;
}
