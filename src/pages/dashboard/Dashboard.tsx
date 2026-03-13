import React from "react";
import { motion } from "framer-motion";
import {
  DoorOpenIcon,
  FolderIcon,
  ImageIcon,
  MessageSquareIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  PlusCircleIcon,
  UploadCloudIcon,
  EditIcon,
  Trash2Icon,
  UserPlusIcon,
  BotIcon,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
interface StatItem {
  id: number;
  label: string;
  value: string;
  icon: React.ElementType;
  trend: string;
  isUp: boolean;
}
interface ActivityItem {
  id: string;
  action: string;
  detail: string;
  user: string;
  time: string;
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
}
const statsData: StatItem[] = [
  {
    id: 1,
    label: "Tổng sản phẩm",
    value: "128",
    icon: DoorOpenIcon,
    trend: "+8 tháng này",
    isUp: true,
  },
  {
    id: 2,
    label: "Danh mục",
    value: "6",
    icon: FolderIcon,
    trend: "+1 tháng này",
    isUp: true,
  },
  {
    id: 3,
    label: "Hình ảnh",
    value: "342",
    icon: ImageIcon,
    trend: "+24 tháng này",
    isUp: true,
  },
  {
    id: 4,
    label: "Tin nhắn mới",
    value: "12",
    icon: MessageSquareIcon,
    trend: "3 chưa trả lời",
    isUp: false,
  },
];
const categoryData = [
  { name: "Cửa gỗ", products: 45, fill: "#d97706" },
  { name: "Cửa nhôm", products: 32, fill: "#b45309" },
  { name: "Cửa thép", products: 18, fill: "#92400e" },
  { name: "Cửa nhựa", products: 15, fill: "#78350f" },
  { name: "Cửa kính", products: 10, fill: "#451a03" },
  { name: "Cửa cuốn", products: 8, fill: "#1c1917" },
];
const recentActivity: ActivityItem[] = [
  {
    id: "A-01",
    action: "Thêm sản phẩm",
    detail: "Cửa gỗ Sồi Nga cao cấp",
    user: "Admin",
    time: "15 phút trước",
    icon: PlusCircleIcon,
    iconColor: "text-emerald-600",
    iconBg: "bg-emerald-50",
  },
  {
    id: "A-02",
    action: "Tải lên 5 ảnh",
    detail: "Cửa nhôm Xingfa hệ 55",
    user: "Editor",
    time: "1 giờ trước",
    icon: UploadCloudIcon,
    iconColor: "text-blue-600",
    iconBg: "bg-blue-50",
  },
  {
    id: "A-03",
    action: "Cập nhật sản phẩm",
    detail: "Cửa thép vân gỗ — sửa giá",
    user: "Admin",
    time: "2 giờ trước",
    icon: EditIcon,
    iconColor: "text-amber-600",
    iconBg: "bg-amber-50",
  },
  {
    id: "A-04",
    action: "Trả lời chatbot",
    detail: "Khách hỏi về cửa kính cường lực",
    user: "Admin",
    time: "3 giờ trước",
    icon: BotIcon,
    iconColor: "text-purple-600",
    iconBg: "bg-purple-50",
  },
  {
    id: "A-05",
    action: "Thêm khách hàng",
    detail: "Nguyễn Văn A — 0901234567",
    user: "Editor",
    time: "5 giờ trước",
    icon: UserPlusIcon,
    iconColor: "text-teal-600",
    iconBg: "bg-teal-50",
  },
  {
    id: "A-06",
    action: "Xóa sản phẩm",
    detail: "Cửa nhựa lõi thép (hết hàng)",
    user: "Admin",
    time: "Hôm qua",
    icon: Trash2Icon,
    iconColor: "text-rose-600",
    iconBg: "bg-rose-50",
  },
];
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
} as const;
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
} as const;
export default function DashboardPage() {
  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Thẻ thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsData.map((stat) => {
          const Icon = stat.icon;
          return (
            <motion.div key={stat.id} variants={itemVariants}>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500 mb-1">
                        {stat.label}
                      </p>
                      <h4 className="text-2xl font-bold text-slate-800">
                        {stat.value}
                      </h4>
                    </div>
                    <div className="h-12 w-12 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-center text-sm">
                    {stat.isUp ? (
                      <TrendingUpIcon className="h-4 w-4 text-emerald-500 mr-1" />
                    ) : (
                      <TrendingDownIcon className="h-4 w-4 text-amber-500 mr-1" />
                    )}
                    <span
                      className={
                        stat.isUp
                          ? "text-emerald-600 font-medium"
                          : "text-amber-600 font-medium"
                      }
                    >
                      {stat.trend}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Biểu đồ sản phẩm theo danh mục */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Sản phẩm theo danh mục</CardTitle>
            </CardHeader>
            <CardContent className="h-[320px] min-h-[320px] w-full">
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={categoryData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e2e8f0"
                  />
                  <XAxis
                    dataKey="name"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                    dy={10}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#64748b", fontSize: 12 }}
                  />
                  <Tooltip
                    formatter={(value) => [
                      `${value ?? 0} sản phẩm`,
                      "Số lượng",
                    ]}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    }}
                  />
                  <Bar dataKey="products" radius={[6, 6, 0, 0]}>
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
        {/* Hoạt động gần đây */}
        <motion.div variants={itemVariants}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Hoạt động gần đây</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {recentActivity.map((activity) => {
                  const Icon = activity.icon;
                  return (
                    <div
                      key={activity.id}
                      className="px-6 py-3.5 flex items-start gap-3"
                    >
                      <div
                        className={`h-8 w-8 rounded-full ${activity.iconBg} flex items-center justify-center shrink-0 mt-0.5`}
                      >
                        <Icon className={`h-4 w-4 ${activity.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-900">
                          <span className="font-medium">{activity.action}</span>
                        </p>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {activity.detail}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge
                            variant="default"
                            className="text-[10px] px-1.5 py-0"
                          >
                            {activity.user}
                          </Badge>
                          <span className="text-[11px] text-slate-400">
                            {activity.time}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
