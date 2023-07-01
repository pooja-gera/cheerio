import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { api } from "@/utils/api";
import { Provider } from "jotai";
import { Toaster } from "react-hot-toast";
import "@/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Provider>
        <Component {...pageProps} />
        <Toaster position="bottom-center" />
      </Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
