import { useMemo } from "react";

// Next
import Link from "next/link";

// Assets

// ShadCn
import { Card } from "@/components/ui/card";

// Components
import { DevDebug, LanguageSelector, ThemeSwitcher } from "@/app/components";
import { ToastContainer } from "react-toastify";

const BaseNavbar = () => {
  const devEnv = useMemo(() => {
    return process.env.NODE_ENV === "development";
  }, []);

  return (
    <header className="lg:container z-[99]">
      <nav>
        <Card className="flex flex-wrap justify-between items-center py-2 px-5 gap-5">
          <Link href={"/"}>
            {/* <Image
                src={Logo}
                alt="Invoify Logo"
                width={190}
                height={100}
                loading="eager"
                        /> */}
            Adanomad.dev
          </Link>
          {/* ? DEV Only */}
          {devEnv && <DevDebug />}
          <LanguageSelector />
          <ThemeSwitcher />
          <ToastContainer />
        </Card>
      </nav>
    </header>
  );
};

export default BaseNavbar;
