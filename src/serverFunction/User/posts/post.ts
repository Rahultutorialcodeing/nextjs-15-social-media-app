import { validateRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { postDataincludes } from "@/lib/types";
import { createPostSchema, createPostValue } from "@/lib/vallidation";

export const Post =async (_: null, { input }: { input: createPostValue }) => {
  try {
    const {user}=await validateRequest()

    if(!user) throw Error("unauthorized")
    const { content } = createPostSchema.parse(input);
     
   const newPost= await prisma.post.create({
        data:{
            content:content,
            userId:user.id
        },
        include:postDataincludes,
    })
  
    
    return newPost

  } catch (error) {
    console.error("Error occurred:", error);
    return {
      success: false,
      message: "Internal server error",
    };
  }
};
