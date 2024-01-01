"use client";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { Button, Spinner } from "@nextui-org/react";
import Link from "next/link";
import Image from "next/image";
import authentication from "@assets/images/authentication.png";
import { useRouter } from "next/navigation";
import SidebarAdmin from "@/components/Table/SidebarAdmin";


// export const metadata = {
//   title: "k-quicksight",
//   description: "Analyze your data!",
// };
export default function DashboardRootLayout({ children }) {
  const { data: user, isLoading } = useGetUserQuery();

  let content = null;

  if (isLoading) {
    content = (
      <div
        className={
          "pl-[15%] py-24 pr-[5%] flex justify-center items-center min-h-screen"
        }
      >
        <Spinner size={"lg"} />
      </div>
    );
  } else if (!user) {
    content = (
      <>
        <div
          className={"flex justify-center flex-col items-center min-h-screen"}
        >
          <Image src={authentication} alt={"authentication image"} />
          <p className={"text-2xl font-semibold text-primary-color"}>
            Ooop! you does not have permission for admin
          </p>
          <Link href={"/auth/login"}>
            <Button
              size={"md"}
              variant={"bordered"}
              color={"primary"}
              className={"my-5"}
            >
              Login
            </Button>
          </Link>
        </div>
      </>
    );
  } else {
    content = (

      <section className={"md:pl-[20%] lg:pl-[18%] py-24 pr-[3%]"}>
        <SidebarAdmin />
        {children}
      </section>
    );
  }
  return content;
}
