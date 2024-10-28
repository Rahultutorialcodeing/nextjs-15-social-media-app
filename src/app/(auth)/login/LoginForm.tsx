"use client"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginSchema, loginValues } from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import LodingButton from "@/components/LodingButton";
import { graphqlclient } from "@/lib/graphqlClient";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/PasswordInput";
import { creteLoginMutaion } from "@/graphql/mutaion/Login";

export default function LoginForm() {
  const [error, setError] = useState<string>();
  const [ispending, startTransation] = useTransition();
  const router = useRouter();

  const form = useForm<loginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      usernameOremail: "",
      passwordHash: "",
    },
  });

  async function onSubmit(value: loginValues) {
    setError(undefined);
    startTransation(async () => {
      const res = await graphqlclient.request(creteLoginMutaion, {
        input: value,
      });
      if (res) {
        if (res.login.success) {
          router.push("/");
        }

        setError(res.login.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {error && <p className="text-center text-destructive">{error}</p>}
        <FormField
          control={form.control}
          name="usernameOremail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordHash"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LodingButton loding={ispending} type="submit" className="w-full">
          Login
        </LodingButton>
      </form>
    </Form>
  );
}
