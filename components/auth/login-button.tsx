"use client";

import { ReactNode } from "react";
import { Dialog, DialogTrigger } from "../ui/dialog";
import { DialogContent } from "@radix-ui/react-dialog";
import LoginForm from "./login-form";

interface LoginButtonProps {
  children: ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({ children, mode = "redirect", asChild }: LoginButtonProps) => {
  console.log(mode);

  return (
    <Dialog>
      <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
      <DialogContent className="p-0 with-auto bg-transparent border-none">
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
};
