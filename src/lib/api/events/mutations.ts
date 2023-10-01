import { db } from "@/lib/db";
import {
  EventId,
  JoinEventParams,
  NewEventParams,
  eventIdSchema,
  events,
  insertEventSchema,
} from "@/lib/db/schema/events";
import { eq } from "drizzle-orm";

export const createEvent = async (event: NewEventParams) => {
  const newEvent = insertEventSchema.parse(event);
  try {
    await db.insert(events).values(newEvent);
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const deleteEvent = async (id: EventId) => {
  const { id: eventId } = eventIdSchema.parse({ id });
  try {
    await db.delete(events).where(eq(events.id, eventId!));
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};

export const joinEvent = async (id: EventId, participants: JoinEventParams) => {
  const { id: eventId } = eventIdSchema.parse({ id });
  try {
    await db.update(events).set({ participants: participants }).where(eq(events.id, id));
    return { success: true };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    return { error: message };
  }
};
