import { Navigate, Outlet } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import path from "@/constants/path";

export default function RejectedRoute() {
  const { data: user, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  const isAuthenticated = !!user;

  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={path.dashboard} replace />
  );
}
