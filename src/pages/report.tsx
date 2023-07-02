import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DashboardWrapper from "@/components/wrappers/Dashboard";
import { cn } from "@/lib/utils";
import { getServerAuthSession } from "@/server/auth";
import { api } from "@/utils/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import type {
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  InferGetServerSidePropsType,
} from "next";
import { type Session } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";
import { LuCalendar as CalendarIcon, LuDownload } from "react-icons/lu";
import * as z from "zod";

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const FormSchema = z.object({
  startDate: z.date({
    required_error: "Start Date required.",
  }),
  endDate: z.date({
    required_error: "End Date is required.",
  }),
  auditorAssigned: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export default function Settings({ user }: Props) {
  const { data: session, status } = useSession();
  const createReportMutation = api.report.createReport.useMutation();
  const allReports = api.report.getAllReports.useQuery(undefined, {
    enabled: session?.user !== undefined,
  });
  const router = useRouter();
  const context = api.useContext();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
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

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    if (createReportMutation.isLoading) return;
    try {
      toast.loading("Creating report...");
      const res = await createReportMutation.mutateAsync({
        auditorAssigned: values.auditorAssigned,
        fromDate: values.startDate,
        toDate: values.endDate,
      });
      if (res.id) {
        toast.dismiss();
        toast.success("Report created!");
        void context.report.getAllReports.invalidate();
      } else {
        toast.dismiss();
        toast.error("Something went wrong!");
      }
    } catch (e) {
      toast.dismiss();
      toast.error("Something went wrong!");
    }
  }

  const date7daysafter = new Date();
  date7daysafter.setDate(date7daysafter.getDate() + 7);

  return (
    <DashboardWrapper>
      {!session?.user.email?.includes("auditor") ? (
        <>
          <Dialog>
            <DialogTrigger>
              <Button variant="default">Create Report</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a Report</DialogTitle>
                <DialogDescription>
                  <Form {...form}>
                    <form
                      onSubmit={(e) => void form.handleSubmit(onSubmit)(e)}
                      className="space-y-8"
                    >
                      <FormField
                        control={form.control}
                        name="startDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>Start Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-full p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  // @ts-expect-error zodResolver infers the type of the field
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              This is the date the audit will start.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="endDate"
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>End Date</FormLabel>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value ? (
                                      format(field.value, "PPP")
                                    ) : (
                                      <span>Pick a date</span>
                                    )}
                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  // @ts-expect-error zodResolver infers the type of the field
                                  onSelect={field.onChange}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                            <FormDescription>
                              This is the date the audit will end.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="auditorAssigned"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Auditor Assigned</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="auditor@shad.com"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              This is the email of the auditor assigned to the
                              audit.
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button type="submit">Submit</Button>
                    </form>
                  </Form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <div className="my-6 grid grid-cols-1 md:grid-cols-2">
            {allReports.data?.map((report) => {
              return (
                <Card
                  onClick={() => void router.push(`/report/${report.id}`)}
                  className="cursor-pointer"
                  key={report.id}
                >
                  <CardHeader>
                    <CardTitle>{report.status}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>Auditor: {report.auditorAssigned}</p>
                    <p className="text-sm text-gray-500">
                      Start Date: {report.fromDate.toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      {" "}
                      End Date: {report.toDate.toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex h-full flex-col items-center justify-center">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Report</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Sent By: sooditkumarabc@gmail.com</p>
              <p>Status: In Progress</p>
              <p>Auditor: auditor@gmail.com</p>
              <p className="text-sm text-gray-500">
                Start Date: {new Date().toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-500">
                {" "}
                End Date: {date7daysafter.toLocaleDateString()}
              </p>
            </CardContent>
            <CardFooter className="gap-x-3">
              <Button variant="secondary">
                <LuDownload /> Download Report
              </Button>
              <Button variant="outline">Require More Documents</Button>
              <Button variant="default">Approve Report</Button>
            </CardFooter>
          </Card>
        </div>
      )}
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
