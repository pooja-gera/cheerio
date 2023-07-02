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

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function Dashboard({ user }: Props) {
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

  return <DashboardWrapper />;
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
