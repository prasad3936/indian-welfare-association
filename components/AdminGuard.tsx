"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("admin-auth");

    if (auth === "true") {
      setAuthorized(true);
    } else {
      router.push("/admin/login");
    }
  }, []);

  if (!authorized) return null;

  return <>{children}</>;
}
