"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import CardWrapper from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { register } from "@/actions/register";
import { useState, useTransition } from "react";
import FormError from "../form-error";
import FormSuccess from "../form-success";
import { RegisterSchema } from "@/schemas";

const FormProps = {
  resolver: zodResolver(RegisterSchema),
  defaultValues: {
    email: "",
    password: "",
    name: "",
  },
};

const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof RegisterSchema>>(FormProps);

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const data = await register(values);

      setError(data?.error);
      setSuccess(data?.success);
    });
  };

  return (
    <CardWrapper
      headerLabel="Create an Account"
      backButtonLabel="Already have an account"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Name: </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="John Doe" type="text" disabled={isPending} />
                  </FormControl>
                </FormItem>
              )}
            />
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
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Create an Account
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};

export default RegisterForm;
