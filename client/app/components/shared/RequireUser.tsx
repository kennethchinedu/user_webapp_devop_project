"use client";

import { IChildren } from "@/app/types";
import useAuth from "@/app/utils/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const RequireUser: React.FC<IChildren> = ({ children }) => {
  const router = useRouter();

  const { isUser, isAdmin } = useAuth();

  useEffect(() => {
    if (!(isUser || isAdmin)) {
      router.push("/");
    }
  }, [isUser, isAdmin, router]);

  if (!(isUser || isAdmin)) {
    return null;
  }

  return <>{children}</>;
};

export default RequireUser;
