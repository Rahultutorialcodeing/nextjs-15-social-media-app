"use client";
import PostEditor from "@/components/Post/editor/PostEditor";
import ForYouFeed from "./ForYouFeed";

export default function Home() {
 

  return (
    <main className="flex min-h-screen w-full min-w-0 gap-5">
      <div className="w-full min-w-0 space-y-5">
        <PostEditor />
        <ForYouFeed/>
      </div>
    </main>
  );
}
