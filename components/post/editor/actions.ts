"use server"

import prisma from "@/lib/prisma"
import { createPostSchema } from "@/validations"
import { getPostDataInclude } from "@/types";
import { validateRequest } from "@/auth"

export async function submitPost(input: string) {
    const { user } = await validateRequest();
  
    if (!user) throw new Error("Unauthorized");
  
    const { content } = createPostSchema.parse({ content: input });
  
    const newPost = await prisma.post.create({
      data: {
        content,
        userId: user.id,
      },
      include: getPostDataInclude(user.id),
    });
  
    return newPost;
  }