"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

import { LoginSchema } from "@/schemas";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { login } from "@/actions/login";
import { useState, useTransition } from "react";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const FormProps = {
  resolver: zodResolver(LoginSchema),
  defaultValues: {
    email: "",
    password: "",
  },
};

const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already used with different provider"
      : "";
  const callbackUrl = searchParams.get("callbackUrl");
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [show2F, setShow2F] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof LoginSchema>>(FormProps);

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      try {
        const data = await login(values, callbackUrl);

        if (data?.error) {
          form.reset();
          setError(data.error);
        }

        if (data?.success) {
          form.reset();
          setSuccess(data.success);
        }

        if (data?.twoFactor) {
          setShow2F(true);
        }
      } catch {
        setError("Something went worng");
      }
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            {show2F && (
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> 2 Factor code: </FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="123456" disabled={isPending} />
                    </FormControl>
                  </FormItem>
                )}
              />
            )}
            {!show2F && (
              <>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Email: </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="pdragan1996@gmail.com"
                          type="email"
                          disabled={isPending}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> Password: </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="****" type="password" disabled={isPending} />
                      </FormControl>
                      <Button size="sm" variant="link" asChild className="px-0 font-normal">
                        <Link href="/auth/reset">Forgot password ?</Link>
                      </Button>
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            {show2F ? "Confirm" : "Login"}
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
