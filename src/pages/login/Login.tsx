import { useState } from "react";
import type { AxiosError } from "axios";
import {
  DoorOpenIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation } from "@tanstack/react-query";
import authApis from "@/apis/auth.apis";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import type { ApiError } from "@/types/api.type";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const loginMutation = useMutation({
    mutationFn: authApis.login,
    onSuccess: () => {
      toast.success("Đăng nhập thành công");
      navigate("/dashboard");
    },
    onError: (error: AxiosError<ApiError>) => {
      console.error("Login failed:", error);
      toast.error(error?.response?.data?.message || "Đăng nhập thất bại");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    loginMutation.mutate({
      email,
      password,
    });
  };
  return (
    <div className="flex min-h-screen">
      {/* LEFT */}
      <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-16 flex-col justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <DoorOpenIcon className="h-6 w-6 text-amber-500" />
          </div>

          <div>
            <h2 className="text-2xl font-bold">
              Door<span className="text-amber-500">Showroom</span>
            </h2>
            <p className="text-xs text-slate-400 uppercase">
              Hệ thống quản trị
            </p>
          </div>
        </div>

        {/* Hero */}
        <div className="max-w-lg space-y-6">
          <h1 className="text-5xl font-bold leading-tight">
            Quản lý showroom
            <br />
            <span className="text-amber-500">dễ dàng & hiệu quả</span>
          </h1>

          <p className="text-slate-400 text-lg">
            Hệ thống quản trị toàn diện cho sản phẩm cửa, khách hàng, hình ảnh
            và chatbot hỗ trợ.
          </p>
        </div>

        <p className="text-sm text-slate-500">
          © 2024 DoorShowroom. Bảo lưu mọi quyền.
        </p>
      </div>

      {/* RIGHT */}
      <div className="flex flex-1 items-center justify-center bg-slate-50 p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center justify-center gap-2 mb-10">
            <DoorOpenIcon className="h-7 w-7 text-amber-500" />
            <span className="text-xl font-bold">
              Door<span className="text-amber-500">Showroom</span>
            </span>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-slate-900">Đăng nhập</h2>

            <p className="text-slate-500 mt-2">
              Đăng nhập vào hệ thống quản trị DoorShowroom
            </p>
          </div>

          {/* FORM */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="space-y-2 text-left">
              <label className="text-sm font-medium text-slate-700">
                Email
              </label>

              <div className="relative">
                <MailIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                <Input
                  type="email"
                  placeholder="admin@doorshowroom.vn"
                  className="h-12 pl-10 focus-visible:ring-amber-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2 text-left">
              <label className="text-sm font-medium text-slate-700">
                Mật khẩu
              </label>

              <div className="relative">
                <LockIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />

                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  className="h-12 pl-10 pr-12 focus-visible:ring-amber-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Options */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-amber-600"
                />

                <span className="text-slate-600">Ghi nhớ đăng nhập</span>
              </label>

              <button
                type="button"
                className="text-amber-600 font-medium hover:underline"
              >
                Quên mật khẩu?
              </button>
            </div>

            {/* Button */}
            <Button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full h-12 text-base bg-amber-500 hover:bg-amber-600"
            >
              {loginMutation.isPending ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-8">
            Chỉ dành cho quản trị viên được cấp quyền truy cập
          </p>
        </div>
      </div>
    </div>
  );
}
