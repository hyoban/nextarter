import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type CtxOrReq } from "next-auth/client/_utils";
import { getCsrfToken } from "next-auth/react";
import { i18n, useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function NewUser({
  csrfToken,
}: {
  csrfToken?: string | number | ReadonlyArray<string> | undefined;
}) {
  const { t } = useTranslation();
  return (
    <>
      <form
        method="post"
        action="/api/auth/signin/email"
        className="flex flex-col items-start justify-center h-full gap-4 w-56 mx-auto"
      >
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <Label htmlFor="email" className="font-bold">
          {t("email-address")}
        </Label>
        <Input type="email" id="email" name="email" />
        <Button type="submit" className="my-2">
          {t("sign-in-with-email")}
        </Button>
      </form>
    </>
  );
}

export async function getServerSideProps(
  context: CtxOrReq & { locale: string }
) {
  if (process.env.NODE_ENV === "development") {
    await i18n?.reloadResources();
  }

  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      csrfToken,
      ...(await serverSideTranslations(context.locale)),
    },
  };
}
