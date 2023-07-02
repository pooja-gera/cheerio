import UserSettingsTable from "@/components/table/user-settings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DashboardWrapper from "@/components/wrappers/Dashboard";
import { getServerAuthSession } from "@/server/auth";
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import { type Session } from "next-auth";
import { useSession } from "next-auth/react";
import { CgSpinner } from "react-icons/cg";
import { LuUserCheck, LuUserMinus, LuUsers } from "react-icons/lu";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Settings({ user }: Props) {
  const { data: session, status } = useSession();

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

  return (
    <DashboardWrapper>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total SOs</CardTitle>
            <LuUsers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">
              Total SOs in the system
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current SO</CardTitle>
            <LuUserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">+5</div>
            <p className="text-xs text-muted-foreground">
              SOs currently active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deleted SO</CardTitle>
            <LuUserMinus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">-1</div>
            <p className="text-xs text-muted-foreground">SOs deleted</p>
          </CardContent>
        </Card>
      </div>
      <UserSettingsTable />
    </DashboardWrapper>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<
  GetServerSidePropsResult<{
    user: Session;
  }>
> => {
  const session = await getServerAuthSession(context);
  if (session) {
    return {
      props: {
        user: session,
      },
    };
  } else {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
};
