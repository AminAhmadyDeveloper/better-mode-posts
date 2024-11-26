import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { cn } from "@/lib/utils";
import { useCookie } from "@/providers/cookie-provider";
import { FC } from "react";
import { Outlet } from "react-router-dom";

export interface MainLayoutProps {}

const MainLayout: FC<MainLayoutProps> = () => {
  const { accessToken } = useCookie();

  return (
    <div className={cn("min-h-screen", accessToken ? "" : "flex flex-col")}>
      <Header />
      <Outlet />
      <Container parentClassName="sticky bottom-0 left-0 right-0 bg-background">
        <Footer />
      </Container>
    </div>
  );
};

export default MainLayout;
