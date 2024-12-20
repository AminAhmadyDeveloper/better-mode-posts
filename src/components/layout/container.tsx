import { cn } from "@/lib/utils";
import type { FC } from "react";

interface ContainerProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  parentClassName?: string;
}

export const Container: FC<ContainerProps> = ({
  className,
  parentClassName,
  ...props
}) => {
  return (
    <div
      className={cn(
        parentClassName,
        "w-full grid place-items-center px-6 xl:px-0 "
      )}
    >
      <div
        className={cn(className, "w-full md:max-w-5xl xl:max-w-7xl")}
        {...props}
      />
    </div>
  );
};
