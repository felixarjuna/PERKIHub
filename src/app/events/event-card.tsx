"use client";

import { useToast } from "@/components/ui/use-toast";
import { trpc } from "@/lib/trpc/client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { BiChurch } from "react-icons/bi";
import { BsPeopleFill } from "react-icons/bs";
import { GiPublicSpeaker } from "react-icons/gi";
import { RiCalendarEventFill, RiDiscussFill } from "react-icons/ri";

interface EventCardProps {
  id: number;
  title: string;
  date: Date;
  speaker: string;
  topic: string;
  participants: string[];
}

export const EventCard = ({ id, title, date, speaker, topic, participants }: EventCardProps) => {
  const utils = trpc.useContext();
  const { toast } = useToast();

  const joinEvent = trpc.events.joinEvent.useMutation({
    onSuccess: async () => {
      await utils.events.invalidate();
      toast({ title: "Join event successfully! ✨" });
    },
  });

  const router = useRouter();
  const { data: session } = useSession();
  const name = React.useMemo(() => session?.user.name, [session]);

  const onUserJoin = () => {
    // Check if user already login
    if (session === null) {
      // If not navigate login page
      return router.push("/api/auth/signin");
    }
    if (name) {
      joinEvent.mutate({ id: id, participants: [...participants, name] });
    }
  };

  return (
    <div className="my-10 bg-cream border-2 border-cream w-96">
      <div className="w-full border-[2px] sm:border-4 border-cream p-8 sm:p-10 bg-tundora-700 -translate-x-1 -translate-y-1">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center bg-maroon border-maroon">
            <BiChurch />
          </div>
          <div>
            <p>Saturday / 15.30 - 17.00</p>
          </div>
        </div>

        <div className="my-5">
          <h3 className="text-xl sm:text-3xl">{title}</h3>
          <div className="flex items-center gap-2 mt-3">
            <RiCalendarEventFill />
            <p className="opacity-80 text-[0.7rem] font-unbounded">{date.toLocaleString()}</p>
          </div>
          <div className="my-1 flex items-center gap-2">
            <GiPublicSpeaker />
            <p className="opacity-80 text-[0.7rem] font-unbounded">{speaker}</p>
          </div>
          <div className="flex items-center gap-2">
            <RiDiscussFill />
            <p className="opacity-80 text-[0.7rem] font-unbounded">{topic}</p>
          </div>
          <div className="flex items-center gap-2">
            <BsPeopleFill />
            <p className="opacity-80 text-[0.7rem] font-unbounded">{participants.length}</p>
          </div>
        </div>

        <div className="flex justify-between flex-col sm:flex-row gap-3">
          <div className="bg-cream w-full sm:w-24">
            <button
              className={
                name && participants.includes(name)
                  ? "button-cream hover:translate-x-0 hover:translate-y-0"
                  : "button-maroon text-[1rem]"
              }
              onClick={onUserJoin}
              disabled={participants.includes(name ?? "")}
            >
              {name && participants.includes(name) ? `Joined` : "Join"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
