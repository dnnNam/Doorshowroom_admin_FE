import Mainlayout from "@/layouts/mainlayouts";
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
      element: <Mainlayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
