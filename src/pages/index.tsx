import LanguageSwitcher from "@/components/generic/i18n";
import ThemeSwitch from "@/components/generic/theme";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { api } from "@/lib/utils";
import { signOut, useSession } from "next-auth/react";
import { i18n, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useState } from "react";

const AuthInfo = () => {
  const { data: sessionData } = useSession();
  const [newPassword, setNewPassword] = useState("");
  const { t } = useTranslation();
  const updatePassword = api.auth.setPassword.useMutation();

  const router = useRouter();

  const signin = () => {
    router
      .push(`/auth/signin?callbackUrl=${window.location.href}`)
      .catch((e) => console.error(e));
  };

  const newUser = () => {
    router.push("/auth/new-user").catch((e) => console.error(e));
  };

  return (
    <div className="flex items-center justify-center gap-4">
      {sessionData && <p>{sessionData.user.email}</p>}

      {sessionData && (
        <>
          <Input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <Button
            variant="subtle"
            className="w-40"
            onClick={() => {
              updatePassword.mutate({ password: newPassword });
            }}
          >
            {t("change-password")}
          </Button>
        </>
      )}

      <Button
        variant="subtle"
        className="w-32"
        onClick={sessionData ? () => void signOut() : signin}
      >
        {sessionData ? t("sign-out") : t("sign-in")}
      </Button>

      {!sessionData && (
        <Button variant="subtle" onClick={newUser}>
          {t("new-user")}
        </Button>
      )}
    </div>
  );
};

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <header className="flex items-center justify-center gap-4 py-3 px-4 w-full border-b-2 dark:border-slate-800">
        <div className="grow"></div>
        <AuthInfo />
        <ThemeSwitch />
        <LanguageSwitcher />
      </header>
    </div>
  );
};

export default Home;

export async function getStaticProps({ locale }: { locale: string }) {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }

  return {
    props: {
      ...(await serverSideTranslations(locale)),
      // Will be passed to the page component as props
    },
  };
}
