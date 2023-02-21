import LanguageSwitcher from "@/components/generic/i18n";
import ThemeSwitch from "@/components/generic/theme";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";

const AuthInfo = () => {
  const { data: sessionData } = useSession();
  const { t } = useTranslation("auth");

  const router = useRouter();

  const signin = () => {
    router
      .push(`/auth/signin?callbackUrl=${window.location.href}`)
      .catch((e) => console.error(e));
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <p>{sessionData && sessionData.user.email}</p>

      <Button
        variant="subtle"
        onClick={sessionData ? () => void signOut() : signin}
      >
        {sessionData ? t("sign-out") : t("sign-in")}
      </Button>
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
  return {
    props: {
      ...(await serverSideTranslations(locale, ["auth"])),
      // Will be passed to the page component as props
    },
  };
}
