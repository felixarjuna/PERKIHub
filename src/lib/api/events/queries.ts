import { db } from "@/lib/db";
import { eq } from "drizzle-orm";
import { type EventId, eventIdSchema, events } from "@/lib/db/schema/events";

export const getEvents = async () => {
  const e = await db.select().from(events);
  return { events: e };
};

export const getEventById = async (id: EventId) => {
  const { id: eventId } = eventIdSchema.parse({ id });
  const [e] = await db.select().from(events).where(eq(events.id, eventId));
  return { event: e };
};

