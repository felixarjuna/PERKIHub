import { getUserAuth } from "@/lib/auth/utils";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema/auth";
import { userIdSchema, type UserId } from "@/lib/db/schema/users";
import { and, eq } from "drizzle-orm";

export const getUsers = async () => {
  const { session } = await getUserAuth();
  const u = await db.select().from(users).where(eq(users.id, session?.user.id!));
  return { users: u };
};

export const getUserById = async (id: UserId) => {
  const { session } = await getUserAuth();
  const { id: userId } = userIdSchema.parse({ id });
  const [u] = await db
    .select()
    .from(users)
    .where(and(eq(users.id, userId), eq(users.id, session?.user.id!)));
  return { user: u };
};
