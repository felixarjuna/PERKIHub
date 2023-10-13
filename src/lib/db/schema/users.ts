import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { getUsers } from "@/lib/api/users/queries";
import { users } from "./auth";

// Schema for users - used to validate API requests
export const insertUserSchema = createInsertSchema(users, {});

export const insertUserParams = createSelectSchema(users, {});

export const updateUserSchema = createSelectSchema(users);

export const updateUserParams = createSelectSchema(users, {});

export const userIdSchema = updateUserSchema.pick({ id: true });

// Types for users - used to type API request params and within Components
export type User = z.infer<typeof updateUserSchema>;
export type NewUser = z.infer<typeof insertUserSchema>;
export type NewUserParams = z.infer<typeof insertUserParams>;
export type UpdateUserParams = z.infer<typeof updateUserParams>;
export type UserId = z.infer<typeof userIdSchema>["id"];

// this type infers the return from getUsers() - meaning it will include any joins
export type CompleteUser = Awaited<ReturnType<typeof getUsers>>["users"][number];
