import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  BsExclamationTriangleFill,
  BsFillCalendarPlusFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../../../lib/hooks/events/useEvents";
import { useAuth } from "../../../lib/hooks/useAuth";
import { EventCard } from "../Cards/EventCard";

const AUTHORIZED_USERS = ["Felix Arjuna"];

export const Events = () => {
  const { currentUser } = useAuth();
  const name = `${currentUser?.firstName} ${currentUser?.lastName}`;

  const navigate = useNavigate();

  const { events, isLoading } = useEvents();

  return (
    <>
      {isLoading && (
        <div className="flex gap-3 items-center justify-center bg-tundora-800 w-screen h-screen z-10 fixed inset-0">
          <AiOutlineLoading3Quarters className="animate-spin w-6 h-6" />
          <p>Loading Content</p>
        </div>
      )}

      <div className="p-8 sm:px-20">
        <div className="sm:mt-10 mb-5">
          <h1 className="text-4xl sm:text-6xl text-gradient-soft font-bold sm:font-normal tracking-wide">
            Events
          </h1>
        </div>

        {AUTHORIZED_USERS.includes(name) ? (
          <div className="my-7 w-36 sm:w-44 bg-lightmaroon">
            <div
              className="mt-4 flex items-center gap-3 cursor-pointer button-cream w-36 sm:w-44 justify-center"
              onClick={() => navigate("create")}
            >
              <BsFillCalendarPlusFill />
              <p>New event</p>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className="my-6 sm:m-0 sm:mt-10">
          <div className="warning-component text-sm sm:text-xl items-center gap-2 inline-flex">
            <BsExclamationTriangleFill />
            <p className="">All events can only joined one day before.</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-7 justify-center sm:justify-start">
          {events
            ?.sort((a, b) => {
              if (a.date > b.date) return -1;
              return 1;
            })
            .map(event => (
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
    </>
  );
};
