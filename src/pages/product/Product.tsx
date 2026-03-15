import React from "react";
import { motion } from "framer-motion";
import {
  PlusIcon,
  SearchIcon,
  FilterIcon,
  EditIcon,
  Trash2Icon,
  ImageIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatVND } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  status: "Còn hàng" | "Hết hàng" | "Sắp hết";
}
const mockProducts: Product[] = [
  {
    id: "SP-001",
    name: "Cửa gỗ tự nhiên Sồi Nga",
    category: "Cửa gỗ",
    price: 4500000,
    stock: 24,
    status: "Còn hàng",
  },
  {
    id: "SP-002",
    name: "Cửa nhôm Xingfa hệ 55",
    category: "Cửa nhôm",
    price: 2200000,
    stock: 150,
    status: "Còn hàng",
  },
  {
    id: "SP-003",
    name: "Cửa thép vân gỗ cao cấp",
    category: "Cửa thép",
    price: 3800000,
    stock: 5,
    status: "Sắp hết",
  },
  {
    id: "SP-004",
    name: "Cửa nhựa lõi thép uPVC",
    category: "Cửa nhựa",
    price: 1800000,
    stock: 0,
    status: "Hết hàng",
  },
  {
    id: "SP-005",
    name: "Cửa kính cường lực 10mm",
    category: "Cửa kính",
    price: 850000,
    stock: 85,
    status: "Còn hàng",
  },
  {
    id: "SP-006",
    name: "Cửa gỗ công nghiệp MDF",
    category: "Cửa gỗ",
    price: 2100000,
    stock: 42,
    status: "Còn hàng",
  },
  {
    id: "SP-007",
    name: "Cửa cuốn khe thoáng Austdoor",
    category: "Cửa cuốn",
    price: 1550000,
    stock: 12,
    status: "Còn hàng",
  },
  {
    id: "SP-008",
    name: "Cửa chống cháy 60 phút",
    category: "Cửa thép",
    price: 4200000,
    stock: 8,
    status: "Sắp hết",
  },
];
export function ProductsPage() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Còn hàng":
        return "success";
      case "Hết hàng":
        return "danger";
      case "Sắp hết":
        return "warning";
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
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="w-full max-w-md">
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              icon={<SearchIcon className="h-4 w-4" />}
            />
          </div>
          <Button variant="outline" className="gap-2">
            <FilterIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Lọc</span>
          </Button>
        </div>
        <Button className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Thêm sản phẩm
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Hình ảnh</th>
                <th className="px-6 py-4 font-medium">Tên sản phẩm</th>
                <th className="px-6 py-4 font-medium">Danh mục</th>
                <th className="px-6 py-4 font-medium">Giá</th>
                <th className="px-6 py-4 font-medium">Tồn kho</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="h-12 w-12 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-400">
                      <ImageIcon className="h-5 w-5" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      {product.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {product.category}
                  </td>
                  <td className="px-6 py-4 font-medium text-slate-900">
                    {formatVND(product.price)}
                  </td>
                  <td className="px-6 py-4 text-slate-600">{product.stock}</td>
                  <td className="px-6 py-4">
                    <Badge variant={getStatusColor(product.status)}>
                      {product.status}
                    </Badge>
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
        <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500">
          <div>Hiển thị 1 đến 8 của 128 sản phẩm</div>
          <div className="flex gap-1">
            <Button variant="outline" size="sm" disabled>
              Trước
            </Button>
            <Button variant="default" size="sm" className="w-8 p-0">
              1
            </Button>
            <Button variant="outline" size="sm" className="w-8 p-0">
              2
            </Button>
            <Button variant="outline" size="sm" className="w-8 p-0">
              3
            </Button>
            <Button variant="outline" size="sm">
              Sau
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
