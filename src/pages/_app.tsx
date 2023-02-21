import "@/styles/globals.css";
import "@total-typescript/ts-reset";

import { api } from "@/lib/utils";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import { ThemeProvider } from "next-themes";
import { type AppType } from "next/app";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <Head>
          <title>Create T3 App</title>
        </Head>
        <main className="h-full w-full">
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(appWithTranslation(MyApp));
