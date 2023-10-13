import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/auth";
import {
  NewUserParams,
  UpdateUserParams,
  UserId,
  insertUserSchema,
  updateUserSchema,
  userIdSchema,
} from "@/lib/db/schema/users";
import { and, eq } from "drizzle-orm";

export const createUser = async (user: NewUserParams) => {
  const newUser = insertUserSchema.parse({ ...user });
  try {
    await db.insert(users).values(newUser);
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const updateUser = async (id: UserId, user: UpdateUserParams) => {
  const { session } = await getUserAuth();
  const { id: userId } = userIdSchema.parse({ id });
  const newUser = updateUserSchema.parse({ ...user, userId: session?.user.id! });
  try {
    await db
      .update(users)
      .set(newUser)
      .where(and(eq(users.id, userId!), eq(users.id, session?.user.id!)));
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteUser = async (id: UserId) => {
  const { session } = await getUserAuth();
  const { id: userId } = userIdSchema.parse({ id });
  try {
    await db.delete(users).where(and(eq(users.id, userId!), eq(users.id, session?.user.id!)));
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};
