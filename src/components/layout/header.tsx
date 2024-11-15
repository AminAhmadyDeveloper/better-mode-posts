import { ModeToggle } from "@/components/common/mode-toggle";
import { Container } from "@/components/layout/container";
import { ProfileDropDown } from "@/components/layout/profile-drop-down";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { For } from "@/components/utils/for";
import { Show } from "@/components/utils/show";
import { Switcher } from "@/components/utils/switcher";
import { useUserData } from "@/hooks/use-user-data";
import { useWindowScroll } from "@/hooks/use-window-scroll";
import { cn } from "@/lib/utils";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { MenuIcon, StarIcon } from "lucide-react";
import { FC, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const routes: { name: string; href: string }[] = [
  { name: "Posts", href: "/" },
  { name: "Contact Me", href: "/auth" },
] as const;

interface HeaderProps {
  hideNavigationMenu?: true;
}

export const Header: FC<HeaderProps> = ({ hideNavigationMenu }) => {
    const { user } = useUserData();
  const [coordinations] = useWindowScroll();

  const headerRef = useRef<HTMLElement | null>(null);

  const [headerClassName, setHeaderClassName] = useState(
    cn("px-2 py-4 lg:py-6")
  );

  useEffect(() => {
    const headerClassList = headerRef.current?.classList;

    if ((coordinations?.y ?? 0) >= 40) {
      if (!headerClassList?.contains("max-h-16")) {
        setHeaderClassName(cn("px-2 py-2 max-h-16"));
      }
    } else {
      if (!headerClassList?.contains("lg:py-6")) {
        setHeaderClassName(cn("px-2 py-4 lg:py-6"));
      }
    }
  }, [coordinations]);

  return (
    <Container parentClassName="border-b sticky top-0 bg-background/5 backdrop-blur-lg z-50">
      <header ref={headerRef} className={cn("transition-all", headerClassName)}>
        <div className="flex items-center gap-2 p-0">
          <Show show={!hideNavigationMenu}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="focus:outline-none focus:ring-1 md:hidden"
                  size="icon"
                  variant="outline"
                >
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <div className="py-1">
                  <For each={routes}>
                    {(route) => {
                      return (
                        <DropdownMenuItem key={route.name} asChild>
                          <Link to={route.href}>{route.name}</Link>
                        </DropdownMenuItem>
                      );
                    }}
                  </For>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </Show>
          <Link
            className="flex items-center justify-center text-xl font-medium"
            to="/"
          >
            <StarIcon className="me-2 h-5 w-5" />
            Bettermode Posts
          </Link>
          <Show show={!hideNavigationMenu}>
            <nav className="ms-10 hidden gap-4 sm:gap-6 md:flex">
              <For each={routes}>
                {(route) => {
                  return (
                    <Link
                      key={route.name}
                      className="text-sm font-medium text-muted-foreground/70 transition-colors hover:text-muted-foreground"
                      to={route.href}
                    >
                      {route.name}
                    </Link>
                  );
                }}
              </For>
            </nav>
          </Show>
          <div className="ms-auto flex gap-2">
            <Switcher selectSecondChild={!!user?.id}>
              <div className="flex gap-x-2">
                <Button asChild>
                  <Link to="/auth">Login</Link>
                </Button>
              </div>
              <ProfileDropDown />
            </Switcher>
            <ModeToggle />
          </div>
        </div>
      </header>
    </Container>
  );
};
