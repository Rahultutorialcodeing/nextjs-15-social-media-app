import prisma from "@/lib/prisma";
import { optSchema, OtpValues } from "@/lib/vallidation";
import { isWithinExpirationDate } from "oslo";
import { NextRequest } from "next/server";
import { lucia } from "@/auth";
import { cookies } from "next/headers";
import { redisClient } from "@/lib/redis";

export const Otp = async (
  _: null,
  { input }: { input: OtpValues },
  context: { req: NextRequest },
) => {
  try {
    const { req } = context;
    const ip = req.headers.get("x-forwarded-for");

    const { username, code } = optSchema.parse(input);
    const decodeName = decodeURIComponent(username);

    const userFind = await prisma.user.findFirst({
      where: {
        username: {
          equals: decodeName,
          mode: "insensitive",
        },
      },
    });

    if (!userFind) {
      // Increment attempt count for IP
      const otpAttempts = await redisClient.incr(`RATE_LIMIT:OTP:${ip}`);

      if (otpAttempts === 1) {
        await redisClient.expire(`RATE_LIMIT:OTP:${ip}`, 30); // Set expiry for 30 seconds
      }
      // Apply rate limit if more than 5 attempts
      if (otpAttempts > 5) {
        await redisClient.expire(`RATE_LIMIT:OTP:${ip}`, 10); // 10 seconds block
        return {
          success: false,
          message: "Too many attempts. Please wait for 10 seconds",
        };
      }

      return {
        success: false,
        message: "Username not found",
      };
    }

    const verifyCodeExpiry = isWithinExpirationDate(userFind.codeExpiry);
    const validVerifyCode = userFind.verifyCode === code;

    // Check if OTP is valid and within expiration time
    if (!validVerifyCode) {
      // Increment attempt count for IP
      const otpAttempts = await redisClient.incr(`RATE_LIMIT:OTP:${ip}`);

      if (otpAttempts === 1) {
        await redisClient.expire(`RATE_LIMIT:OTP:${ip}`, 30); // Set expiry for 30 seconds
      }
      // Apply rate limit if more than 5 attempts
      if (otpAttempts > 5) {
        await redisClient.expire(`RATE_LIMIT:OTP:${ip}`, 10); // 10 seconds block
        return {
          success: false,
          message: "Too many attempts. Please wait for 10 seconds",
        };
      }

      return {
        success: false,
        message: "Incorrect verification code",
      };
    }

    if (!verifyCodeExpiry) {
      // Increment attempt count for IP
      const otpAttempts = await redisClient.incr(`RATE_LIMIT:OTP:${ip}`);

      if (otpAttempts === 1) {
        await redisClient.expire(`RATE_LIMIT:OTP:${ip}`, 30); // Set expiry for 30 seconds
      }
      // Apply rate limit if more than 5 attempts
      if (otpAttempts > 5) {
        await redisClient.expire(`RATE_LIMIT:OTP:${ip}`, 10); // 10 seconds block
        return {
          success: false,
          message: "Too many attempts. Please wait for 10 seconds",
        };
      }
      return {
        success: false,
        message: "Verification code has expired",
      };
    }

    // Mark user as verified

    await prisma.user.update({
      where: { username: userFind.username },
      data: {
        verify_User: true,
      },
    });

    const session = await lucia.createSession(userFind.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return {
      success: true,
      message: `${userFind.username} welcom to instagram`,
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      success: false,
      message: "Internal server error",
    };
  }
};
