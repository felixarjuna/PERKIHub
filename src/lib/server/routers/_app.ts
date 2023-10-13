import { computersRouter } from "./computers";
import { router } from "../trpc";
import { eventsRouter } from "./events";
import { usersRouter } from "./users";

export const appRouter = router({
  computers: computersRouter,
  events: eventsRouter,
  users: usersRouter,
});

export type AppRouter = typeof appRouter;
