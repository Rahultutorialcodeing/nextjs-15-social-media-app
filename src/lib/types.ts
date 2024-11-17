import { Prisma } from "@prisma/client";

export const postDataincludes = {
  user: {
    select: {
      username: true,
      displayname: true,
      userAvtar: true,
    },
  },
} satisfies Prisma.PostInclude;

export type PostData = Prisma.PostGetPayload<{
  include: typeof postDataincludes;
}>;

export interface PostPage{
  posts:PostData[];
  nextCursor:string | null
}
