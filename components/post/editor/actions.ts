"use server"

import prisma from "@/lib/prisma"
import { createPostSchema } from "@/validations"
import { validateRequest } from "@/auth"

export async function submitPost(input: string) {
    const { user } = await validateRequest()

    if (!user) throw Error("Unauthorized")

    const { content } = createPostSchema.parse({ content: input })
    console.log(content)

    await prisma.post.create({
        data: {
            content,
            userId: user.id
        }
    })

}