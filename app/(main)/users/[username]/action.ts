"use server"

import prisma from "@/lib/prisma";
import { getUserDataSelect } from "@/types";
import { updateUserProfileSchema, UpdateUserProfileValues } from "@/validations";
import { validateRequest } from "@/auth";

export async function updateUserProfile(values: UpdateUserProfileValues) {
    const { user } = await validateRequest()

    if (!user) throw new Error("Unauthorized")

    const validateValues = updateUserProfileSchema.parse(values)

    const updateUser = await prisma.user.update({
        where: { id: user.id },
        data: validateValues,
        select: getUserDataSelect(user.id)
    })

    return updateUser
}