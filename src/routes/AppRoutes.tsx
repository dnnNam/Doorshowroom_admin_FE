import Mainlayout from "@/layouts/mainlayouts";
import Dashboard from "@/pages/dashboard";
import LoginPage from "@/pages/login/Login";
import { createBrowserRouter, RouterProvider } from "react-router";
import RejectedRoute from "./PrivateRoutes/RejectedRoute";
import ProtectedRoute from "./PrivateRoutes/ProtectedRoute";
import ChatbotManager from "@/pages/chatbot";
import path from "@/constants/path";
import { CategoriesPage } from "@/pages/categories/Categories";

export default function AppRoutes() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RejectedRoute />,
      children: [{ index: true, element: <LoginPage /> }],
    },

    {
      path: "/dashboard",
      element: <ProtectedRoute />,
      children: [
        {
          element: <Mainlayout />,
          children: [
            { index: true, element: <Dashboard /> },
            { path: path.chatbot, element: <ChatbotManager /> },
            { path: path.categories, element: <CategoriesPage /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
