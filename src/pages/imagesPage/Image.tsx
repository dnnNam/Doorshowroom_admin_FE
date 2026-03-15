import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloudIcon,
  Trash2Icon,
  StarIcon,
  ImageIcon,
  CheckCircle2Icon,
  PackageIcon,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// --- Mock Data ---
interface Product {
  id: string;
  name: string;
}
const MOCK_PRODUCTS: Product[] = [
  {
    id: "SP-001",
    name: "Cửa gỗ tự nhiên Sồi Nga",
  },
  {
    id: "SP-002",
    name: "Cửa nhôm Xingfa hệ 55",
  },
  {
    id: "SP-003",
    name: "Cửa thép vân gỗ cao cấp",
  },
  {
    id: "SP-004",
    name: "Cửa nhựa lõi thép uPVC",
  },
  {
    id: "SP-005",
    name: "Cửa kính cường lực 10mm",
  },
];
interface ImageItem {
  id: string;
  productId: string;
  date: string;
  color: string;
  isPrimary: boolean;
}
const INITIAL_IMAGES: ImageItem[] = [
  {
    id: "IMG-01",
    productId: "SP-001",
    date: "24/10/2023",
    color: "bg-amber-800",
    isPrimary: true,
  },
  {
    id: "IMG-02",
    productId: "SP-001",
    date: "24/10/2023",
    color: "bg-amber-700",
    isPrimary: false,
  },
  {
    id: "IMG-03",
    productId: "SP-002",
    date: "22/10/2023",
    color: "bg-slate-700",
    isPrimary: true,
  },
  {
    id: "IMG-04",
    productId: "SP-002",
    date: "22/10/2023",
    color: "bg-slate-600",
    isPrimary: false,
  },
  {
    id: "IMG-05",
    productId: "SP-003",
    date: "20/10/2023",
    color: "bg-orange-900",
    isPrimary: true,
  },
  {
    id: "IMG-06",
    productId: "SP-003",
    date: "20/10/2023",
    color: "bg-orange-800",
    isPrimary: false,
  },
  {
    id: "IMG-07",
    productId: "SP-004",
    date: "18/10/2023",
    color: "bg-sky-200",
    isPrimary: true,
  },
  {
    id: "IMG-08",
    productId: "SP-004",
    date: "18/10/2023",
    color: "bg-sky-300",
    isPrimary: false,
  },
];
// --- Animations ---
const containerVariants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};
const itemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.2,
    },
  },
} as const;
export default function ImagesPage() {
  const [images, setImages] = useState<ImageItem[]>(INITIAL_IMAGES);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(
    null,
  );
  const [uploadProductId, setUploadProductId] = useState<string>("");
  // --- Handlers ---
  const handleSetPrimary = (imageId: string, productId: string) => {
    setImages((prev) =>
      prev.map((img) => {
        if (img.productId === productId) {
          return {
            ...img,
            isPrimary: img.id === imageId,
          };
        }
        return img;
      }),
    );
  };
  const handleDelete = (imageId: string) => {
    setImages((prev) => prev.filter((img) => img.id !== imageId));
  };
  // --- Derived State ---
  const imageCountByProduct = useMemo(() => {
    const counts: Record<string, number> = {};
    images.forEach((img) => {
      counts[img.productId] = (counts[img.productId] || 0) + 1;
    });
    return counts;
  }, [images]);
  const filteredImages = useMemo(() => {
    if (!selectedProductId) return images;
    return images.filter((img) => img.productId === selectedProductId);
  }, [images, selectedProductId]);
  const groupedImages = useMemo(() => {
    const groups: Record<string, ImageItem[]> = {};
    filteredImages.forEach((img) => {
      if (!groups[img.productId]) groups[img.productId] = [];
      groups[img.productId].push(img);
    });
    return groups;
  }, [filteredImages]);
  const totalImages = images.length;
  const totalProductsWithImages = Object.keys(imageCountByProduct).length;
  return (
    <div className="space-y-8 pb-12">
      {/* --- Upload Section --- */}
      <Card className="overflow-hidden border-amber-900/10">
        <div className="bg-amber-50/50 border-b border-amber-100 px-6 py-4 flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
            <UploadCloudIcon className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-amber-900">
              Tải ảnh mới
            </h2>
            <p className="text-xs text-amber-700/70">
              Thêm hình ảnh vào thư viện sản phẩm
            </p>
          </div>
        </div>

        <div className="p-6 flex flex-col md:flex-row gap-6 items-start">
          {/* Product Selector for Upload */}
          <div className="w-full md:w-1/3 space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              1. Chọn sản phẩm <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <select
                className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                value={uploadProductId}
                onChange={(e) => setUploadProductId(e.target.value)}
              >
                <option value="" disabled>
                  -- Chọn sản phẩm --
                </option>
                {MOCK_PRODUCTS.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
            {uploadProductId && (
              <div className="flex items-center gap-2 text-xs text-emerald-600 bg-emerald-50 px-3 py-2 rounded-md border border-emerald-100">
                <CheckCircle2Icon className="h-4 w-4" />
                <span>Đã chọn sản phẩm để tải lên</span>
              </div>
            )}
          </div>

          {/* Dropzone */}
          <div className="w-full md:w-2/3 space-y-3">
            <label className="block text-sm font-medium text-slate-700">
              2. Chọn hình ảnh
            </label>
            <div
              className={cn(
                "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-colors",
                uploadProductId
                  ? "border-amber-300 bg-amber-50/30 hover:bg-amber-50/50 cursor-pointer"
                  : "border-slate-200 bg-slate-50 opacity-60 cursor-not-allowed",
              )}
            >
              <div
                className={cn(
                  "h-12 w-12 rounded-full flex items-center justify-center mb-3",
                  uploadProductId
                    ? "bg-amber-100 text-amber-600"
                    : "bg-slate-200 text-slate-400",
                )}
              >
                <ImageIcon className="h-6 w-6" />
              </div>
              <p className="text-sm font-medium text-slate-900 mb-1">
                Kéo thả hình ảnh vào đây
              </p>
              <p className="text-xs text-slate-500 mb-4">
                Hỗ trợ JPG, PNG, WEBP (Tối đa 5MB)
              </p>
              <Button disabled={!uploadProductId} size="sm">
                Chọn file từ máy tính
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* --- Filter & Stats Section --- */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <PackageIcon className="h-5 w-5 text-slate-500" />
              Thư viện hình ảnh
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Tổng cộng{" "}
              <span className="font-medium text-slate-900">{totalImages}</span>{" "}
              hình ảnh thuộc{" "}
              <span className="font-medium text-slate-900">
                {totalProductsWithImages}
              </span>{" "}
              sản phẩm
            </p>
          </div>
        </div>

        {/* Horizontal Tabs */}
        <div className="flex overflow-x-auto pb-2 -mx-2 px-2 hide-scrollbar gap-2">
          <button
            onClick={() => setSelectedProductId(null)}
            className={cn(
              "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all border",
              selectedProductId === null
                ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/20"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300",
            )}
          >
            Tất cả sản phẩm
            <span
              className={cn(
                "ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs",
                selectedProductId === null
                  ? "bg-white/20 text-white"
                  : "bg-slate-100 text-slate-500",
              )}
            >
              {totalImages}
            </span>
          </button>

          {MOCK_PRODUCTS.map((product) => {
            const count = imageCountByProduct[product.id] || 0;
            if (count === 0) return null; // Hide products with no images
            const isSelected = selectedProductId === product.id;
            return (
              <button
                key={product.id}
                onClick={() => setSelectedProductId(product.id)}
                className={cn(
                  "flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all border",
                  isSelected
                    ? "bg-amber-600 text-white border-amber-600 shadow-md shadow-amber-600/20"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300",
                )}
              >
                {product.name}
                <span
                  className={cn(
                    "ml-2 inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs",
                    isSelected
                      ? "bg-white/20 text-white"
                      : "bg-slate-100 text-slate-500",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* --- Image Grid --- */}
      <div className="space-y-8">
        <AnimatePresence mode="popLayout">
          {Object.entries(groupedImages).map(([productId, productImages]) => {
            const product = MOCK_PRODUCTS.find((p) => p.id === productId);
            if (!product) return null;
            return (
              <motion.div
                key={productId}
                layout
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  scale: 0.95,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="space-y-4"
              >
                {/* Section Header (only show if viewing "All") */}
                {!selectedProductId && (
                  <div className="flex items-center gap-3 pb-2 border-b border-slate-200">
                    <h3 className="text-base font-medium text-slate-800">
                      {product.name}
                    </h3>
                    <Badge variant="default" className="text-xs">
                      {productImages.length} ảnh
                    </Badge>
                  </div>
                )}

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                >
                  <AnimatePresence>
                    {productImages.map((img) => (
                      <motion.div
                        key={img.id}
                        layout
                        variants={itemVariants}
                        className="group relative"
                      >
                        <Card className="overflow-hidden border-slate-200/60 hover:border-amber-300 hover:shadow-lg hover:shadow-amber-900/5 transition-all duration-300">
                          <div
                            className={cn(
                              "aspect-square w-full relative",
                              img.color,
                            )}
                          >
                            {/* Primary Badge */}
                            {img.isPrimary && (
                              <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-amber-500 text-white px-2.5 py-1 rounded-full text-xs font-medium shadow-md shadow-amber-900/20">
                                <StarIcon className="h-3.5 w-3.5 fill-current" />
                                <span>Ảnh chính</span>
                              </div>
                            )}

                            {/* Hover Overlay Actions */}
                            <div className="absolute inset-0 bg-slate-900/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3 backdrop-blur-[2px]">
                              {!img.isPrimary && (
                                <Button
                                  variant="outline"
                                  size="icon"
                                  onClick={() =>
                                    handleSetPrimary(img.id, img.productId)
                                  }
                                  className="h-10 w-10 rounded-full bg-white/10 border-white/20 text-white hover:bg-amber-500 hover:border-amber-500 hover:text-white"
                                  title="Đặt làm ảnh chính"
                                >
                                  <StarIcon className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="default"
                                size="icon"
                                onClick={() => handleDelete(img.id)}
                                className="h-10 w-10 rounded-full shadow-lg"
                                title="Xóa ảnh"
                              >
                                <Trash2Icon className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Card Footer */}
                          <div className="p-3 bg-white">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs font-semibold text-slate-700">
                                {img.id}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                {img.date}
                              </span>
                            </div>
                            {/* If viewing a specific product, we don't need to show the product name again, but it's good context */}
                            <p
                              className="text-xs text-slate-500 truncate"
                              title={product.name}
                            >
                              {product.name}
                            </p>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {filteredImages.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <ImageIcon className="h-12 w-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-medium text-slate-900">
              Không có hình ảnh nào
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Sản phẩm này chưa có hình ảnh. Hãy tải lên hình ảnh mới.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
