"use server"

import prisma from "@/lib/prisma";
import { postDataInclude } from "@/types";
import { validateRequest } from "@/auth";

export async function deletePost(id: string) {
    const { user } = await validateRequest();

    if (!user) throw new Error("Unauthorized");

    const post = await prisma.post.findUnique({
        where: { id },
    });

    if (!post) throw new Error("Post not found");

    if (post.userId !== user.id) throw new Error("Unauthorized");

    const deletedPost = await prisma.post.delete({
        where: { id },
        include: postDataInclude,
    });

    return deletedPost;
}