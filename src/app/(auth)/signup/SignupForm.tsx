"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupSchema, SignupValues } from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import LodingButton from "@/components/LodingButton";
import { graphqlclient } from "@/lib/graphqlClient";
import { creteUserMutaion } from "@/graphql/mutaion/Signup";
import { useRouter } from "next/navigation";
import { PasswordInput } from "@/components/PasswordInput";
import { useAppDispatch } from "@/lib/hooks";
import { otpHandler } from "@/Redux-toolkit/otp";

export default function SignupForm() {
  const [error, setError] = useState<string>();
  const [ispending, startTransation] = useTransition();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const form = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      username: "",
      passwordHash: "",
      displayname: "",
    },
  });

  async function onSubmit(value: SignupValues) {
    setError(undefined);
    startTransation(async () => {
      const res = await graphqlclient.request(creteUserMutaion, {
        input: value,
      });
      if (res) {
        if (res.signup.success) {
          router.push(`/verify/${res.signup.username}`);
        }

        if (res.signup.email) {
          dispatch(otpHandler(res.signup.email));
        }

        setError(res.signup.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {error && <p className="text-center text-destructive">{error}</p>}
        <FormField
          control={form.control}
          name="username"
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="displayname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Full name" {...field} />
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
          Create account
        </LodingButton>
      </form>
    </Form>
  );
}
