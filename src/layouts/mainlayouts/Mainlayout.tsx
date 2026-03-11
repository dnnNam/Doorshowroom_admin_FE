import { Header } from "@/components/Header";
import path from "@/constants/path";
import { Outlet, useLocation } from "react-router";
import Asidebar from "@/components/Asidebar";
export default function Mainlayout() {
  const location = useLocation();
  const pageTitle: Record<string, string> = {
    [path.dashboard]: "Tổng quan hệ thống",
  };
  const title = pageTitle[location.pathname] || path.dashboard;
  return (
    <div className="flex h-screen">
      <Asidebar />

      <div className="flex-1 flex flex-col">
        <Header title={title} />

        <main className="flex-1 overflow-y-auto bg-slate-50 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
