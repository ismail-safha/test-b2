"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { FC, ReactNode } from "react";

interface ProviderProps {
  children: ReactNode;
}

const ProtectedComponent: FC<ProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  const router = useRouter();

  if (session?.user.role === "USER") {
    router.replace("/login");
  }
  return <>{children}</>;
};

export default ProtectedComponent;
