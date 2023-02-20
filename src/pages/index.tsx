import ThemeSwitch from "@/components/generic/theme";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

const AuthInfo = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex items-center justify-center gap-4">
      <p>{sessionData && sessionData.user.email}</p>

      <Button
        variant="subtle"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "退出登录" : "登录"}
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
      </header>
    </div>
  );
};

export default Home;
