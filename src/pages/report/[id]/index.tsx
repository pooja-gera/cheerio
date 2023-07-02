import GeneralDisclosures from "@/components/content/general-disclosures";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ReportWrapper from "@/components/wrappers/Report";
import { answerAtom } from "@/jotai/answers";
import { viewPdfAtom } from "@/jotai/viewpdf";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/utils/api";
import { useAtom } from "jotai";
import type { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { type Session } from "next-auth";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "react-hot-toast";
import { LuLoader } from "react-icons/lu";

const DynamicPDF = dynamic(() => import("@/components/content/PDF"), {
  loading: () => <p>Loading...</p>,
  ssr: false,
});

export default function SpecificReport() {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();
  const [viewPdf, setViewPdf] = useAtom(viewPdfAtom);
  const [answers, setAnswers] = useAtom(answerAtom);
  const [rendering, setRendering] = React.useState(true);
  const handleSaveMutation = api.report.saveOrUpdateReport.useMutation();
  const getReportById = api.report.getReportById.useQuery(
    {
      id: id as string,
    },
    {
      enabled: !!id && session?.user !== undefined,
    }
  );

  React.useEffect(() => {
    if (id) {
      setRendering(false);
    }
  }, []);

  React.useEffect(() => {
    // as soon as we get the getReportById.data, we need to set that to atom
    if (getReportById.data?.sectionA) {
      console.log(getReportById.data.sectionA);
      setAnswers(getReportById.data.sectionA);
    }
  }, [getReportById?.data?.sectionA, setAnswers]);

  if (rendering) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LuLoader className="animate-spin" />
      </div>
    );
  }

  async function handleSaveReport(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> {
    event.preventDefault();
    try {
      toast.loading("Saving Report");
      console.log(answers, "answers");
      const res = await handleSaveMutation.mutateAsync({
        id: id as string,
        sectionA: answers,
      });
      if (res.success) {
        toast.dismiss();
        toast.success("Report Saved Successfully");
      } else {
        toast.dismiss();
        toast.error("Something Went Wrong");
      }
    } catch (e) {
      toast.dismiss();
      toast.error("Something Went Wrong");
    }
  }

  async function sendPDFforAudit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> {
    e.preventDefault();
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  return (
    <ReportWrapper>
      {!viewPdf && (
        <Tabs defaultValue="general-disclosures">
          <TabsList>
            <TabsTrigger value="general-disclosures">
              General Disclosures
            </TabsTrigger>
            <TabsTrigger value="management-and-process-disclosures">
              Management and Process Disclosures
            </TabsTrigger>
            <TabsTrigger value="principal-wise-performance-disclosures">
              Principal-wise Performance Disclosures
            </TabsTrigger>
          </TabsList>
          <TabsContent className="h-full" value="general-disclosures">
            <GeneralDisclosures />
          </TabsContent>
          <TabsContent value="management-and-process-disclosures">
            Change your password here.
          </TabsContent>
          <TabsContent value="principal-wise-performance-disclosures">
            principal-wise-performance-disclosures
          </TabsContent>
        </Tabs>
      )}

      {viewPdf && (
        <div className="mt-4 min-h-[800px]">
          <DynamicPDF />
        </div>
      )}

      {/** ALIGN BUTTON AT BOTTOM */}
      <div className="mt-4 flex justify-end gap-x-4">
        <Button onClick={(e) => void handleSaveReport(e)} variant="secondary">
          Save
        </Button>
        <Button onClick={(e) => void sendPDFforAudit(e)}>
          Send PDF for Audit
        </Button>
        <Button onClick={() => setViewPdf(!viewPdf)} variant="destructive">
          {viewPdf ? "Hide PDF" : "View PDF"}
        </Button>
      </div>
    </ReportWrapper>
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
