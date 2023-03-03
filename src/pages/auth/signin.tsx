import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getCsrfToken } from "next-auth/react";
import { i18n, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function SignIn({
  csrfToken,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { t } = useTranslation();
  return (
    <form
      method="post"
      action="/api/auth/callback/credentials"
      className="h-screen flex flex-col gap-4 items-center justify-center"
    >
      <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
      <Label>
        {t("email-address")}
        <Input name="email" type="text" />
      </Label>
      <Label>
        {t("password")}
        <Input name="password" type="password" />
      </Label>
      <Button type="submit">{t("sign-in")}</Button>
    </form>
  );
}

export async function getServerSideProps(
  context: GetServerSidePropsContext & { locale: string }
) {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }
  return {
    props: {
      csrfToken: await getCsrfToken(context),
      ...(await serverSideTranslations(context.locale)),
    },
  };
}
