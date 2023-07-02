import { useSession } from "next-auth/react";
import { CgSpinner } from "react-icons/cg";
import * as React from "react";
import DashboardWrapper from "@/components/wrappers/Dashboard";

export default function Dashboard() {
  const { data: session, status, update } = useSession();

  if (status === "loading") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <CgSpinner className="animate-spin" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4">
        <p className="text-center text-2xl text-white">
          You are not logged in.
        </p>
      </div>
    );
  }

  return <DashboardWrapper />;
}
