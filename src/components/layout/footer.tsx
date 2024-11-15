import { CodeIcon } from "lucide-react";
import type { FC } from "react";

import { cn } from "@/lib/utils";

const twitterUrl = "https://twitter.com/MorningStartHero";

export const Footer: FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
> = ({ className, ...props }) => {
  return (
    <footer className={cn(className, "px-4 py-6")} {...props}>
      <div className="flex items-center p-0">
        <CodeIcon className="me-2 h-6 w-6" />
        <p className="text-sm">
          Developer by{" "}
          <a className="underline underline-offset-4" href={twitterUrl}>
            Amin Ahmady
          </a>
          .
        </p>
      </div>
    </footer>
  );
};
