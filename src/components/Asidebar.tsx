import React from "react";

import {
  LayoutDashboardIcon,
  DoorOpenIcon,
  FolderIcon,
  UsersIcon,
  ImageIcon,
  MessageSquareIcon,
  ShieldIcon,
  LogOutIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import path from "@/constants/path";
import { useLocation, useNavigate } from "react-router";
export type PageType =
  | "dashboard"
  | "products"
  | "categories"
  | "orders"
  | "customers"
  | "images"
  | "chatbot"
  | "accounts";

interface NavItem {
  id: PageType;
  label: string;
  icon: React.ElementType;
  path?: string;
}
const navItems: NavItem[] = [
  {
    id: "dashboard",
    label: "Tổng quan",
    icon: LayoutDashboardIcon,
    path: path.dashboard,
  },
  {
    id: "products",
    label: "Sản phẩm",
    icon: DoorOpenIcon,
    path: path.products,
  },
  {
    id: "categories",
    label: "Danh mục",
    icon: FolderIcon,
    path: path.categories,
  },

  {
    id: "customers",
    label: "Khách hàng",
    icon: UsersIcon,
    path: path.customers,
  },
  { id: "images", label: "Hình ảnh", icon: ImageIcon },
  {
    id: "chatbot",
    label: "Chatbot",
    icon: MessageSquareIcon,
    path: path.chatbot,
  },
  { id: "accounts", label: "Tài khoản", icon: ShieldIcon, path: path.accounts },
];
export default function Asidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-slate-800 to-slate-900 flex flex-col border-r border-slate-800 flex-shrink-0 relative z-20">
      <div className="h-16 flex items-center px-6 border-b border-slate-700/50">
        <div className="flex items-center gap-2 text-amber-500">
          <DoorOpenIcon className="h-8 w-8" />
          <span className="text-xl font-bold tracking-tight text-white">
            Door<span className="text-amber-500">Showroom</span>
          </span>
        </div>
      </div>
      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = item.path && location.pathname === item.path;
          const isDisabled = !item.path;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (!item.path) return;
                navigate(item.path);
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative group",
                isDisabled
                  ? "text-slate-500 cursor-not-allowed opacity-50"
                  : isActive
                    ? "text-amber-500 bg-amber-500/10"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/50",
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute left-0 top-0 bottom-0 w-1 bg-amber-500 rounded-r-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <Icon
                className={cn(
                  "h-5 w-5",
                  isActive
                    ? "text-amber-500"
                    : "text-slate-400 group-hover:text-slate-300",
                )}
              />
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="p-4 border-t border-slate-700/50">
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-colors">
          <LogOutIcon className="h-5 w-5" />
          Đăng xuất
        </button>
      </div>
    </aside>
  );
}
