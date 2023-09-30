import { date, json, mysqlTable, serial, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { getEvents } from "@/lib/api/events/queries";

export const events = mysqlTable("events", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  date: date("date").notNull(),
  speaker: varchar("speaker", { length: 256 }).notNull(),
  topic: varchar("topic", { length: 256 }).notNull(),
  participants: json("participants").notNull().$type<string[]>(),
});

// Schema for events - used to validate API requests
export const insertEventSchema = createInsertSchema(events, {
  participants: z.array(z.string()),
}).omit({ id: true });

export const insertEventParams = createSelectSchema(events, {
  id: z.coerce.number(),
}).omit({
  id: true,
});

export const updateEventSchema = createSelectSchema(events);

export const updateEventParams = createSelectSchema(events, {
  date: z.coerce.string(),
  id: z.coerce.number(),
});

export const eventIdSchema = updateEventSchema.pick({ id: true });

// Types for events - used to type API request params and within Components
export type Event = z.infer<typeof updateEventSchema>;
export type NewEvent = z.infer<typeof insertEventSchema>;
export type NewEventParams = z.infer<typeof insertEventParams>;
export type UpdateEventParams = z.infer<typeof updateEventParams>;
export type EventId = z.infer<typeof eventIdSchema>["id"];

// this type infers the return from getEvents() - meaning it will include any joins
export type CompleteEvent = Awaited<ReturnType<typeof getEvents>>["events"][number];
