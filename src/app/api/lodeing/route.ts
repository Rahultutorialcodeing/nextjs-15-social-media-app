import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { postDataincludes, PostPage } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;
    const pageSize = 10;

    const { user } = await validateRequest();

    if (!user) return Response.json("unauthorise");

    const posts = await prisma.post.findMany({
      include: postDataincludes,
      orderBy: { createdAt: "desc" },
      take: pageSize + 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const nextCursor = posts.length > pageSize ? posts[pageSize].id : null;

    const data:PostPage={
        posts:posts.slice(0,pageSize),
        nextCursor,
    }

    return Response.json(data);
  } catch (error) {
    return Response.json("ineterval mserver error");
  }
}
