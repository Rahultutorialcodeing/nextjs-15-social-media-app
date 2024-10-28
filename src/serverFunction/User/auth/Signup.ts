import prisma from "@/lib/prisma";
import { signupSchema, SignupValues } from "@/lib/vallidation";
import { hash } from "@node-rs/argon2";
import { generateRandomString, alphabet } from "oslo/crypto";
import { TimeSpan, createDate } from "oslo";
import { generateIdFromEntropySize } from "lucia";
import { sendVerificationEmial } from "@/lib/sendVerificationEmial";

export const Signup = async (
  parent: null,
  { input }: { input: SignupValues },
) => {
  try {
    const { username, email, displayname, passwordHash } =
      signupSchema.parse(input);
    const userId = generateIdFromEntropySize(10);
    const hashP = await hash(passwordHash, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
      parallelism: 1,
    });
    const code = generateRandomString(4, alphabet("0-9"));

    const usernameExits = await prisma.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: "insensitive",
        },

        verify_User: true,
      },
    });

    if (usernameExits)
      return {
        success: false,
        message: "Username already exist",
      };

    const emailExits = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
    });

    if (emailExits) {
      if (emailExits.verify_User) {
        return {
          success: false,
          message: "Email already exist",
        };
      } else {
        await prisma.user.update({
          where: { email: emailExits.email }, // unique identifier
          data: {
            username: username,
            displayname: displayname,
            passwordHash: hashP,
            verifyCode: code,
            codeExpiry: createDate(new TimeSpan(15, "m")),
          },
        });

        //send resend email
        const emailRes = await sendVerificationEmial(username, email, code);

        if (!emailRes.success) {
          return {
            success: false,
            message: emailRes.message,
          };
        }
        return {
          success: true,
          message: "Verification email resent. Please check your email",
          username: emailExits.username,
          email: emailExits.email,
        };
      }
    }

    await prisma.user.create({
      data: {
        id: userId,
        username,
        displayname,
        email,
        passwordHash: hashP,
        verifyCode: code,
        codeExpiry: createDate(new TimeSpan(15, "m")),
      },
    });

    //send resend email
    const emailRes = await sendVerificationEmial(username, email, code);

    if (!emailRes.success) {
      return {
        success: false,
        message: emailRes.message,
      };
    }
    return {
      success: true,
      message: "User registered successfully. Please verify your email",
      username: username,
      email: email,
    };
  } catch (error) {
    console.error("Error occurred:", error);
    return {
      success: false,
      message: "Interval server error",
    };
  }
};
