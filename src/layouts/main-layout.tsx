import { Button } from "@/components/ui/button";
import { FC } from "react";
import { Link, Outlet } from "react-router-dom";

export interface MainLayoutProps {}

const MainLayout: FC<MainLayoutProps> = () => {
  return (
    <div>
      <nav>
        <Button asChild>
          <Link to="/">Home</Link>
        </Button>
        <Button asChild>
          <Link to="/about">About</Link>
        </Button>
      </nav>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
