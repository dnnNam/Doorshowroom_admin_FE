import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatVND } from "@/lib/utils";
import { motion } from "framer-motion";
import { SearchIcon, PlusIcon, MoreVerticalIcon } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  joinDate: string;
}
const mockCustomers: Customer[] = [
  {
    id: "KH-001",
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    phone: "0901234567",
    ordersCount: 5,
    totalSpent: 45000000,
    joinDate: "10/01/2023",
  },
  {
    id: "KH-002",
    name: "Trần Thị B",
    email: "tranthib@example.com",
    phone: "0912345678",
    ordersCount: 2,
    totalSpent: 12500000,
    joinDate: "15/02/2023",
  },
  {
    id: "KH-003",
    name: "Lê Văn C",
    email: "levanc@example.com",
    phone: "0923456789",
    ordersCount: 8,
    totalSpent: 85000000,
    joinDate: "20/03/2023",
  },
  {
    id: "KH-004",
    name: "Phạm Thị D",
    email: "phamthid@example.com",
    phone: "0934567890",
    ordersCount: 1,
    totalSpent: 3800000,
    joinDate: "05/04/2023",
  },
  {
    id: "KH-005",
    name: "Hoàng Văn E",
    email: "hoangvane@example.com",
    phone: "0945678901",
    ordersCount: 3,
    totalSpent: 21000000,
    joinDate: "12/05/2023",
  },
  {
    id: "KH-006",
    name: "Đặng Văn F",
    email: "dangvanf@example.com",
    phone: "0956789012",
    ordersCount: 4,
    totalSpent: 32000000,
    joinDate: "18/06/2023",
  },
  {
    id: "KH-007",
    name: "Bùi Thị G",
    email: "buithig@example.com",
    phone: "0967890123",
    ordersCount: 2,
    totalSpent: 15500000,
    joinDate: "22/07/2023",
  },
  {
    id: "KH-008",
    name: "Vũ Văn H",
    email: "vuvanh@example.com",
    phone: "0978901234",
    ordersCount: 6,
    totalSpent: 58000000,
    joinDate: "30/08/2023",
  },
];
export default function CustomersPage() {
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
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="w-full max-w-md">
          <Input
            placeholder="Tìm kiếm tên, email, số điện thoại..."
            icon={<SearchIcon className="h-4 w-4" />}
          />
        </div>
        <Button className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Thêm khách hàng
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Khách hàng</th>
                <th className="px-6 py-4 font-medium">Liên hệ</th>
                <th className="px-6 py-4 font-medium text-center">
                  Số đơn hàng
                </th>
                <th className="px-6 py-4 font-medium">Tổng chi tiêu</th>
                <th className="px-6 py-4 font-medium">Ngày tham gia</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold">
                        {customer.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 group-hover:text-amber-600 transition-colors">
                          {customer.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {customer.id}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-900">{customer.phone}</div>
                    <div className="text-xs text-slate-500">
                      {customer.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 text-xs font-medium text-slate-700">
                      {customer.ordersCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {formatVND(customer.totalSpent)}
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {customer.joinDate}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-slate-400 hover:text-slate-700"
                    >
                      <MoreVerticalIcon className="h-4 w-4" />
                    </Button>
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
