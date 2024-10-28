"use client";
import LodingButton from "@/components/LodingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { creteOtpMutaion } from "@/graphql/mutaion/Otp";
import { graphqlclient } from "@/lib/graphqlClient";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { optSchema, OtpValues } from "@/lib/vallidation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";

interface usernameParams {
  usenamePropesSend: string;
}

export default function OtpForm({ usenamePropesSend }: usernameParams) {
  const [error, setError] = useState<string>();
  const [ispending, startTransation] = useTransition();
  const router = useRouter();
  const selector = useAppSelector((state) => state.otpSlice.otpValue);

  const form = useForm<OtpValues>({
    resolver: zodResolver(optSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = () => {};

  async function oncolmenHabdler(value: string) {
    console.log(value);
    setError(undefined);
    startTransation(async () => {
      const res = await graphqlclient.request(creteOtpMutaion, {
        input: {
          username: usenamePropesSend,
          code: value,
        },
      });
      if (res) {
        if (res.otp.success) {
          router.push(`/`);
        }

        setError(res.otp.message);
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        {error && <p className="text-center text-destructive">{error}</p>}
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="">
                Verification email sent to:{" "}
                <span className="text-[green]">{selector}</span>
              </FormLabel>
              <FormControl>
                <InputOTP maxLength={4} {...field} onComplete={oncolmenHabdler}>
                  <div className="flex justify-center gap-6">
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={1} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </div>
                </InputOTP>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <LodingButton loding={ispending} type="submit" className="w-full">
          Verify otp
        </LodingButton>
      </form>
    </Form>
  );
}
