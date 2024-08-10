"use server"

import prisma from "@/lib/prisma"
import { createPostSchema } from "@/validations"
import { getPostDataInclude } from "@/types";
import { validateRequest } from "@/auth"

export async function submitPost(input: {
  content: string;
  mediaIds: string[]
}) {
  const { user } = await validateRequest();

  if (!user) throw new Error("Unauthorized");

  const { content, mediaIds } = createPostSchema.parse(input);

  const newPost = await prisma.post.create({
    data: {
      content,
      userId: user.id,
      attachments: {
        connect: mediaIds.map(id => ({ id }))
      }
    },
    include: getPostDataInclude(user.id),
  });

  return newPost;
}