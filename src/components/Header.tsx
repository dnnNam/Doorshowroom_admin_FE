import { SearchIcon, BellIcon, MenuIcon } from "lucide-react";
import { Input } from "./ui/input";

interface DashboardHeaderProps {
  title: string;
}
export function Header({ title }: DashboardHeaderProps) {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm shadow-slate-100/50">
      <div className="flex items-center gap-4">
        <button className="lg:hidden text-slate-500 hover:text-slate-700">
          <MenuIcon className="h-6 w-6" />
        </button>
        <h3 className="text-3xl font-semibold text-slate-800">{title}</h3>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden md:block w-64">
          <Input
            placeholder="Tìm kiếm..."
            icon={<SearchIcon className="h-4 w-4" />}
            className="bg-slate-50 border-slate-200 focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative text-slate-400 hover:text-amber-600 transition-colors">
            <BellIcon className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-2 w-2 bg-rose-500 rounded-full ring-2 ring-white"></span>
          </button>

          <div className="h-8 w-px bg-slate-200"></div>

          <div className="flex items-center gap-3 cursor-pointer group">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-slate-700 group-hover:text-amber-600 transition-colors">
                Admin User
              </p>
              <p className="text-xs text-slate-500">Super Admin</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 font-bold">
              AD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
