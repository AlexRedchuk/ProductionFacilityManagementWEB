"use client";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { addBearer, getRole, isAuth, logOut } from "@/lib/utils/auth";
import { useRouter } from "next/navigation";

const MENU_ITEMS: { label: string; link: string }[] = [
  {
    label: "Facilities",
    link: "/facilities",
  },
  {
    label: "Equipment types",
    link: "/equipmentTypes",
  },
  {
    label: "Contracts",
    link: "/contracts",
  },
];

const Navbar = () => {
  const router = useRouter();
  addBearer();
  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper className="border-b border-gray-200">
          <div className="flex h-16 items-center">
            <div className="ml-4 flex lg:ml-0">
              <Link href={"/contracts"}>
                <h2 className="uppercase text-lg">Facility management</h2>
              </Link>
            </div>

            <div className="flex items-center flex-1 space-x-10 justify-center">
              {MENU_ITEMS.map((item, i) => {
                return (
                  <Link key={i} href={item.link}>
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <div className="ml-auto flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                {isAuth() ? (
                  <>
                    <Button
                      onClick={() => {
                        logOut();
                        router.push("/sign-in");
                        router.refresh();
                      }}
                    >
                      Log out
                    </Button>
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                    <p>[{getRole()}]</p>
                  </>
                ) : (
                  <>
                    <Link
                      href={"/sign-in"}
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Sign in
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default Navbar;
