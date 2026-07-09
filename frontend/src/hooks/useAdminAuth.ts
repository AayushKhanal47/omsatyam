import { useEffect, useState } from "react";
import { getMe } from "@/api/auth";
import type { Admin } from "@/api/auth";

export const useAdminAuth = () => {
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      try {
        const res = await getMe();
        setAdmin(res.data);
      } catch {
        setAdmin(null);
      } finally {
        setLoading(false);
      }
    };
    check();
  }, []);

  return { admin, loading };
};