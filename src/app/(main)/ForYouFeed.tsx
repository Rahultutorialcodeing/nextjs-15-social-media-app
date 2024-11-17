// "use client";

// import Post from "@/components/Post/Post";
// import { PostPage } from "@/lib/types";
// import { useInfiniteQuery } from "@tanstack/react-query";
// import { Loader2 } from "lucide-react";
// import { graphqlclient } from "@/lib/graphqlClient"; // Apollo Client import
// import InfiniteScrollContainer from "@/components/InfinitScrollConteiner";
// import { getvewDataQuery } from "@/graphql/query/vewData";
// import PostsLodingSkelaton from "@/components/Post/LodingSkelaton";

// export default function ForYouFeed() {
//   const {
//     data,
//     fetchNextPage,
//     hasNextPage,
//     isFetching,
//     isFetchingNextPage,
//     status,
//   } = useInfiniteQuery({
//     queryKey: ["post-feed", "for-you"],
//     queryFn: async ({ pageParam }) => {
//       const { vewpost }: any = await graphqlclient.request(getvewDataQuery,{
//         cursor: pageParam ,
//       }); // Pass cursor as variable if required
//       const { posts, nextCursor } = vewpost;

//       return {
//         posts,
//         nextCursor,
//       };
//     },
//     initialPageParam: null as string | null,
//     getNextPageParam: (lastPage) => lastPage.nextCursor,
//   });


//   const posts = data?.pages.flatMap((page) => page.posts) || [];

//   if (status === "pending") {
//     return <PostsLodingSkelaton/>;
//   }

//   if (status === "success" && !posts.length && !hasNextPage) {
//     return (
//       <p className="text-center text-muted-foreground">
//         No one has posted anything yet.
//       </p>
//     );
//   }

//   if (status === "error") {
//     return (
//       <p className="text-center text-destructive">
//         An error occurred while loading posts.
//       </p>
//     );
//   }

//   return (
//     <InfiniteScrollContainer
//       className="space-y-5"
//       onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
//     >
//       {posts.map((post, i) => (
//         <Post key={i} post={post} />
//       ))}
//       {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
//     </InfiniteScrollContainer>
//   );
// }










































"use client";

import InfiniteScrollContainer from "@/components/InfinitScrollConteiner";
import PostsLodingSkelaton from "@/components/Post/LodingSkelaton";
import Post from "@/components/Post/Post";
import kyInstance from "@/lib/ky";
import { PostPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";

export default function ForYouFeed() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["post-feed", "for-you"],
    queryFn: ({ pageParam }) =>
      kyInstance
        .get(
          "/api/lodeing",
          pageParam ? { searchParams: { cursor: pageParam } } : {},
        )
        .json<PostPage>(),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });


  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (status === "pending") {
    return <PostsLodingSkelaton/>
  }

  if (status === "success" && !posts.length && !hasNextPage) {
    return (
      <p className="text-center text-muted-foreground">
        No one has posted anything yet.
      </p>
    );
  }

  if (status === "error") {
    return (
      <p className="text-center text-destructive">
        An error occurred while loading posts.
      </p>
    );
  }

  return (
    <InfiniteScrollContainer
      className="space-y-5"
      onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
    >
      {posts.map((post,i) => (
        <Post key={i} post={post} />
      ))}
      {isFetchingNextPage && <Loader2 className="mx-auto my-3 animate-spin" />}
    </InfiniteScrollContainer>
  );
}
