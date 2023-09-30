"use client";

import SignIn from "@/components/auth/SignIn";
import { trpc } from "@/lib/trpc/client";
import { CalendarPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { EventCard } from "./event-card";

export default function Events() {
  const router = useRouter();

  const { data } = trpc.events.getEvents.useQuery();

  return (
    <div className="p-8 sm:px-20">
      <div className="sm:mt-10">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl sm:text-6xl text-gradient">Events</h1>
          <SignIn />
        </div>
      </div>

      <div className="mt-7 w-36 sm:w-44 bg-lightmaroon">
        <div
          className="mt-4 flex items-center gap-3 cursor-pointer button-cream w-36 sm:w-44 justify-center"
          onClick={() => router.push("create-event")}
        >
          <CalendarPlus />
          <p>New event</p>
        </div>
      </div>

      <div className="flex gap-10">
        {data?.events?.map((event) => (
          <EventCard
            key={event.id}
            id={event.id}
            title={event.title}
            date={event.date}
            speaker={event.speaker}
            topic={event.topic}
            participants={event.participants}
          />
        ))}
      </div>
    </div>
  );
}
