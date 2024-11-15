"use client";
import * as React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "@/lib/utils";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

export interface StatefulButtonProps extends ButtonProps {
  status: "idle" | "loading" | "success" | "error";
}

export const StatefulButton: React.FC<StatefulButtonProps> = ({
  variant,
  className,
  status,
  children,
  ...rest
}) => {
  const [state, setState] = React.useState<typeof status>("idle");
  React.useEffect(() => {
    setState(status);
    if (!["idle", "loading"].includes(status)) {
      const timeout = setTimeout(() => setState("idle"), 3000);
      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [status]);

  return (
    <Button
      disabled={state == "loading"}
      {...rest}
      variant={state === "error" ? "destructive" : variant}
      className={cn("w-36 rounded-lg overflow-hidden", className)}
    >
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.span
            key={state}
            exit={{
              opacity: 0,
              y: -15,
              transition: { duration: 0.3, type: "spring" },
            }}
          >
            {children}
          </motion.span>
        )}
        {state === "loading" && (
          <motion.span
            key={state}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 100, y: 0, transition: { delay: 0 } }}
            exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
          >
            <Loader2 className="animate-spin" size="19" />
          </motion.span>
        )}

        {["success", "error"].includes(state) && (
          <motion.span
            key={state}
            initial={{ opacity: 0, y: 15, scale: 0 }}
            animate={{
              opacity: 100,
              y: 0,
              scale: 1,
              transition: { delay: 0.1, duration: 0.4 },
            }}
            exit={{ opacity: 0, y: -15, transition: { duration: 0.3 } }}
          >
            {state === "success" && <CheckCircle2 size="20" />}
            {state === "error" && <XCircle size="20" />}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
};

export const getButtonState = (
  isLoading?: boolean,
  isDone?: boolean,
  isError?: boolean
): StatefulButtonProps["status"] => {
  if (isLoading) return "loading";
  if (isDone) return "success";
  if (isError) return "error";
  return "idle";
};
