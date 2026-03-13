import authApis from "@/apis/auth.apis";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: authApis.getme,
    retry: false,
    staleTime: Infinity,
  });
};
