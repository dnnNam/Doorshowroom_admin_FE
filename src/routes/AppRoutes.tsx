import LoginPage from "@/pages/login/Login";
import { createBrowserRouter, RouterProvider } from "react-router";

export default function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
