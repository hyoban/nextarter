import ThemeSwitch from "@/components/generic/theme";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <header className="flex py-3 px-4 w-full border-b-2 dark:border-slate-800">
        <div className="grow"></div>
        <ThemeSwitch />
      </header>
    </div>
  );
};

export default Home;
