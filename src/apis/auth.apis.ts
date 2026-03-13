import http from "@/config/http";
import type { ApiError } from "@/types/api.type";

const authApis = {
  login: ({ email, password }: { email: string; password: string }) => {
    return http.post<ApiError>("/api/auth/login", { email, password });
  },

  getme: () => {
    return http.get<ApiError>("/api/auth/me");
  },
};

export default authApis;
