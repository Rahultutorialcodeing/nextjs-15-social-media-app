import { lucia } from "@/auth";
import prisma from "@/lib/prisma";
import { redisClient } from "@/lib/redis";
import { loginSchema, loginValues } from "@/lib/vallidation";
import { verify } from "@node-rs/argon2";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export const Login = async (
  _: null,
  { input }: { input: loginValues },
  context: { req: NextRequest },
) => {
  try {
    const { usernameOremail, passwordHash } = loginSchema.parse(input);
    const { req } = context;
    const ip = req.headers.get("x-forwarded-for");

    const exitsUsername = await prisma.user.findFirst({
      where: {
        OR: [
          {
            username: {
              equals: usernameOremail,
              mode: "insensitive",
            },
          },
          {
            email: {
              equals: usernameOremail,
              mode: "insensitive",
            },
          },
        ],
        verify_User: true,
      },
    });

    if (!exitsUsername || !exitsUsername.passwordHash) {
      // Increment attempt count for IP
      const loginAttempts = await redisClient.incr(`RATE_LIMIT:LOGIN:${ip}`);

      if (loginAttempts === 1) {
        await redisClient.expire(`RATE_LIMIT:LOGIN:${ip}`, 30); // Set expiry for 30 seconds
      }
      // Apply rate limit if more than 5 attempts
      if (loginAttempts > 5) {
        await redisClient.expire(`RATE_LIMIT:LOGIN:${ip}`, 10); // 10 seconds block
        return {
          success: false,
          message: "Too many attempts. Please wait for 10 seconds",
        };
      }
      return {
        success: false,
        message: "Incorrect username or password",
      };
    }

    const validPassword = await verify(
      exitsUsername.passwordHash,
      passwordHash,
      {
        memoryCost: 19456,
        timeCost: 2,
        outputLen: 32,
        parallelism: 1,
      },
    );

    if (!validPassword) {
      // Increment attempt count for IP
      const loginAttempts = await redisClient.incr(`RATE_LIMIT:LOGIN:${ip}`);

      if (loginAttempts === 1) {
        await redisClient.expire(`RATE_LIMIT:LOGIN:${ip}`, 30); // Set expiry for 30 seconds
      }
      // Apply rate limit if more than 5 attempts
      if (loginAttempts > 5) {
        await redisClient.expire(`RATE_LIMIT:LOGIN:${ip}`, 10); // 10 seconds block
        return {
          success: false,
          message: "Too many attempts. Please wait for 10 seconds",
        };
      }
      return {
        success: false,
        message: "Incorrect username or password",
      };
    }

    const session = await lucia.createSession(exitsUsername.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    (await cookies()).set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return {
      success: true,
      message: `${exitsUsername.username} welcom to instagram`,
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      success: false,
      message: "Internal server error",
    };
  }
};
