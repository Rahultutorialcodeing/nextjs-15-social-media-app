import { PostData } from "@/lib/types";
import Link from "next/link";
import React from "react";
import UserAvatar from "../UserAvatar";
import { formatRelativeDate } from "@/lib/utils";

interface PostProps {
  post: PostData;
}

export default function Post({ post }: PostProps) {
  
  return (
    <article className="space-y-3 rounded-2xl bg-card p-5 shadow-sm ">
      <div className="flex flex-wrap gap-3">
        <Link href={`/profile/${post.user.username}`}>
          <UserAvatar avatarUrl={post.user.userAvtar} />
        </Link>

        <div>
          <Link
            href={`/profile/${post.user.username}`}
            className="block font-medium hover:underline"
          >
            {post.user.displayname}
          </Link>
          <Link
            href={`/post/${post.id}`}
            className="block text-sm text-muted-foreground hover:underline"
          >
           {formatRelativeDate(post.createdAt)}
          </Link>
        </div>
      </div>

      <div className="whitespace-pre-line break-words">{post.content}</div>
    </article>
  );
}