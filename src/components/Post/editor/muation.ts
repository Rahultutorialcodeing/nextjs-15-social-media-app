import { cretePostMutaion } from "@/graphql/mutaion/Post";
import { useToast } from "@/hooks/use-toast";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { Post } from "../../../serverFunction/User/posts/post";
import { graphqlclient } from "@/lib/graphqlClient";
import { PostPage } from "@/lib/types";

export function useSubmitMutaion() {
  const { toast } = useToast();
  const queryClint = useQueryClient();

  const mutaion = useMutation({
    mutationFn: async (variables: any) => {
      const data = await graphqlclient.request(cretePostMutaion, {
        input: variables, // Yeh `input` GraphQL mutation ke liye variable hai
      });
      return data.post;
    },
    onSuccess: async (newpost) => {
      const queryFiltter: QueryFilters = { queryKey: ["post-feed", "for-you"] };

      await queryClint.cancelQueries(queryFiltter);

      queryClint.setQueriesData<InfiniteData<PostPage, string | null>>(
        queryFiltter,
        (OldData:any)=>{
          const firstPage=OldData?.pages[0]

          if(firstPage){
            return {
              pageParams:OldData.pageParams,
              pages:[
                {
                  posts:[newpost,...firstPage.posts],
                  nextCursor:firstPage.nextCursor
                },
                ...OldData.pages.slice(1),
              ]
            }
          }
        }
      )

      queryClint.invalidateQueries({
        queryKey:queryFiltter.queryKey,
        predicate(query){
          return !query.state.data;
        }
      })

      toast({
        description:"Post created"
      })
    },
    onError(error, variable, context) {
      console.log(error);
      toast({
        variant: "destructive",
        description: "failed to post. Please try again.",
      });
    },
  });

  return mutaion;
}
