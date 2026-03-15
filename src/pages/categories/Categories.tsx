import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { PlusIcon, EditIcon, Trash2Icon } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  productCount: number;
  createdAt: string;
}
const mockCategories: Category[] = [
  {
    id: "CAT-01",
    name: "Cửa gỗ",
    description: "Các loại cửa gỗ tự nhiên và công nghiệp",
    productCount: 45,
    createdAt: "12/01/2023",
  },
  {
    id: "CAT-02",
    name: "Cửa nhôm",
    description: "Cửa nhôm kính Xingfa, Việt Pháp",
    productCount: 32,
    createdAt: "15/01/2023",
  },
  {
    id: "CAT-03",
    name: "Cửa thép",
    description: "Cửa thép vân gỗ, cửa chống cháy",
    productCount: 18,
    createdAt: "20/02/2023",
  },
  {
    id: "CAT-04",
    name: "Cửa nhựa",
    description: "Cửa nhựa lõi thép uPVC, cửa nhựa composite",
    productCount: 24,
    createdAt: "05/03/2023",
  },
  {
    id: "CAT-05",
    name: "Cửa kính",
    description: "Cửa kính cường lực, vách kính",
    productCount: 15,
    createdAt: "10/04/2023",
  },
  {
    id: "CAT-06",
    name: "Cửa cuốn",
    description: "Cửa cuốn khe thoáng, cửa cuốn tấm liền",
    productCount: 12,
    createdAt: "22/05/2023",
  },
];
export function CategoriesPage() {
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
        <h2 className="text-lg font-medium text-slate-800">Quản lý danh mục</h2>
        <Button className="gap-2">
          <PlusIcon className="h-4 w-4" />
          Thêm danh mục
        </Button>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-medium">Tên danh mục</th>
                <th className="px-6 py-4 font-medium">Mô tả</th>
                <th className="px-6 py-4 font-medium">Số sản phẩm</th>
                <th className="px-6 py-4 font-medium">Ngày tạo</th>
                <th className="px-6 py-4 font-medium text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockCategories.map((category) => (
                <tr
                  key={category.id}
                  className="hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900 group-hover:text-amber-600 transition-colors">
                      {category.name}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600 max-w-xs truncate">
                    {category.description}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-slate-100 text-xs font-medium text-slate-700">
                      {category.productCount}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {category.createdAt}
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
      </Card>
    </motion.div>
  );
}
