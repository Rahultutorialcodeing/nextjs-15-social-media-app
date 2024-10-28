import { Metadata } from "next";
import Link from "next/link";
import React from "react";
import OtpForm from "./OtpForm";

interface PageProps {
  params: Promise<{ username: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { username } = await params;
  return {
    title: `Verify ${username}`,
  };
}

export default async function Signup({ params }: PageProps) {
  const { username } = await params;
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[28rem] w-full max-w-[30rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 ">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">Verify your otp</h1>
            <p className="text-muted-foreground">
              A place where even <span className="italic">you</span> can find a
              friend.
            </p>
          </div>
          <div className="space-y-5">
            <OtpForm usenamePropesSend={username} />
            <Link
              href={"/signup"}
              className="block text-center hover:underline"
            >
              Back to signup page
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
