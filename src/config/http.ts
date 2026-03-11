import type { AxiosInstance } from "axios";
import axios from "axios";
import { toast } from "sonner";

class Http {
  instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
      timeout: 10000,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      paramsSerializer: {
        indexes: null,
      },
    });
    this.setupInterceptors();
  }
  private setupInterceptors() {
    this.instance.interceptors.response.use(
      (res) => res,
      (error) => {
        const status = error.response?.status;
        const message = error.response?.data?.message;

        switch (status) {
          case 400:
          case 404:
          case 422:
            toast.warning(message || "Yêu cầu không hợp lệ");
            break;

          case 500:
            toast.error("Lỗi hệ thống, vui lòng thử lại");
            break;

          default:
            toast.error("Có lỗi xảy ra");
        }

        return Promise.reject(error);
      },
    );
  }
}

const http = new Http().instance;

export default http;
