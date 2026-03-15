import Mainlayout from "@/layouts/mainlayouts";
import Dashboard from "@/pages/dashboard";
import LoginPage from "@/pages/login/Login";
import { createBrowserRouter, RouterProvider } from "react-router";
import RejectedRoute from "./PrivateRoutes/RejectedRoute";
import ProtectedRoute from "./PrivateRoutes/ProtectedRoute";
import ChatbotManager from "@/pages/chatbot";
import path from "@/constants/path";
import { CategoriesPage } from "@/pages/categories/Categories";
import { ProductsPage } from "@/pages/product/Product";
import CustomersPage from "@/pages/customer";
import AccountsPage from "@/pages/account";
import ImagesPage from "@/pages/imagesPage";
import VideosPage from "@/pages/videoPage/Video";

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
            { path: path.products, element: <ProductsPage /> },
            { path: path.customers, element: <CustomersPage /> },
            { path: path.accounts, element: <AccountsPage /> },
            { path: path.images, element: <ImagesPage /> },
            { path: path.videos, element: <VideosPage /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}
