import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { PlusIcon, EditIcon, Trash2Icon, ShieldIcon } from "lucide-react";

interface Account {
  id: string;
  name: string;
  email: string;
  role: "Super Admin" | "Admin" | "Editor";
  status: "Hoạt động" | "Khóa";
  lastLogin: string;
}
const mockAccounts: Account[] = [
  {
    id: "ACC-01",
    name: "Trần Quản Trị",
    email: "admin@doorshowroom.vn",
    role: "Super Admin",
    status: "Hoạt động",
    lastLogin: "Vừa xong",
  },
  {
    id: "ACC-02",
    name: "Lê Bán Hàng",
    email: "sales@doorshowroom.vn",
    role: "Admin",
    status: "Hoạt động",
    lastLogin: "2 giờ trước",
  },
  {
    id: "ACC-03",
    name: "Nguyễn Nội Dung",
    email: "content@doorshowroom.vn",
    role: "Editor",
    status: "Hoạt động",
    lastLogin: "1 ngày trước",
  },
  {
    id: "ACC-04",
    name: "Phạm Hỗ Trợ",
    email: "support@doorshowroom.vn",
    role: "Editor",
    status: "Hoạt động",
    lastLogin: "2 ngày trước",
  },
  {
    id: "ACC-05",
    name: "Hoàng Kế Toán",
    email: "acc@doorshowroom.vn",
    role: "Admin",
    status: "Khóa",
    lastLogin: "1 tháng trước",
  },
];
export default function AccountsPage() {
  const getRoleColor = (role: string) => {
    switch (role) {
      case "Super Admin":
        return "danger";
      case "Admin":
        return "info";
      case "Editor":
        return "success";
      default:
        return "default";
    }
  };
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium text-slate-800">
            Tài khoản quản trị
          </h2>
          <p className="text-sm text-slate-500">
            Quản lý quyền truy cập hệ thống
          </p>
        </div>
        <Button className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Thêm tài khoản
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Họ tên</th>
                <th className="px-6 py-4 font-medium">Email</th>
                <th className="px-6 py-4 font-medium">Vai trò</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 font-medium">Đăng nhập cuối</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockAccounts.map((account) => (
                <tr
                  key={account.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                        <ShieldIcon className="h-4 w-4" />
                      </div>
                      <div className="font-medium text-slate-900 group-hover:text-amber-600 transition-colors">
                        {account.name}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">{account.email}</td>
                  <td className="px-6 py-4">
                    <Badge variant={getRoleColor(account.role)}>
                      {account.role}
                    </Badge>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-medium ${account.status === "Hoạt động" ? "text-emerald-600" : "text-rose-600"}`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${account.status === "Hoạt động" ? "bg-emerald-600" : "bg-rose-600"}`}
                      ></span>
                      {account.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {account.lastLogin}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-blue-600"
                      >
                        <EditIcon className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-slate-400 hover:text-rose-600"
                        disabled={account.role === "Super Admin"}
                      >
                        <Trash2Icon className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
