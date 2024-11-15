import { FC } from "react";
import authBackground from "@/images/auth-background.jpg";
import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";

export const AuthLayout: FC = () => {
  return (
    <div className="w-screen h-screen overflow-hidden grid md:grid-cols-2">
      <div className="flex items-center justify-center order-2 md:-order-1 col-span-full md:col-span-1">
        <Outlet />
      </div>
      <div className="block relative p-4 md:p-6 xl:p-12">
        <div
          className={cn(
            "absolute bg-primary/25 rounded-xl",
            "top-4 right-4 left-4 bottom-4",
            "md:top-6 md:right-6 md:left-6 md:bottom-6",
            "xl:top-12 xl:right-12 xl:left-12 xl:bottom-12"
          )}
        />
        <img
          src={authBackground}
          alt="Auth Background"
          className="h-full w-full object-cover object-center rounded-xl"
        />
      </div>
    </div>
  );
};
