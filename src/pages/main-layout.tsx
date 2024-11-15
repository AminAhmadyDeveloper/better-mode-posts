import { Container } from "@/components/layout/container";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { FC } from "react";
import { Outlet } from "react-router-dom";

export interface MainLayoutProps {}

const MainLayout: FC<MainLayoutProps> = () => {
  return (
    <div>
      <Header />
      <Outlet />
      <Container parentClassName="fixed bottom-0 left-0 right-0">
        <Footer />
      </Container>
    </div>
  );
};

export default MainLayout;
