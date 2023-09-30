import { computersRouter } from "./computers";
import { router } from "../trpc";
import { eventsRouter } from "./events";

export const appRouter = router({
  computers: computersRouter,
  events: eventsRouter,
});

export type AppRouter = typeof appRouter;
