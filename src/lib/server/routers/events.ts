import { createEvent, deleteEvent, joinEvent, updateEvent } from "@/lib/api/events/mutations";
import { getEventById, getEvents } from "@/lib/api/events/queries";
import { eventIdSchema, insertEventParams, updateEventParams } from "@/lib/db/schema/events";
import { z } from "zod";
import { publicProcedure, router } from "../trpc";

export const eventsRouter = router({
  getEvents: publicProcedure.query(async () => {
    return getEvents();
  }),
  getEventById: publicProcedure.input(eventIdSchema).query(async ({ input }) => {
    return getEventById(input.id);
  }),
  createEvent: publicProcedure.input(insertEventParams).mutation(async ({ input }) => {
    return createEvent(input);
  }),
  updateEvent: publicProcedure.input(updateEventParams).mutation(async ({ input }) => {
    return updateEvent(input.id, input);
  }),
  deleteEvent: publicProcedure.input(eventIdSchema).mutation(async ({ input }) => {
    return deleteEvent(input.id);
  }),
  joinEvent: publicProcedure
    .input(
      z.object({
        id: z.number(),
        participants: z.array(z.string()),
      })
    )
    .mutation(async ({ input }) => {
      return joinEvent(input.id, input.participants);
    }),
});
