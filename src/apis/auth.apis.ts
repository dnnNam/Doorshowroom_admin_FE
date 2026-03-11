import http from "@/config/http";
import type { ApiError } from "@/types/api.type";

const authApis = {
  login: ({ email, password }: { email: string; password: string }) => {
    return http.post<ApiError>("/api/auth/login", { email, password });
  },
};

export default authApis;
