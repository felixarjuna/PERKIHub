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
        <div className="flex gap-3 items-center justify-center bg-tundora-800 w-screen h-screen z-20 fixed inset-0">
          <AiOutlineLoading3Quarters className="animate-spin w-6 h-6 leading-6" />
          <p>Loading Content</p>
        </div>
      )}

      <div className="p-8 sm:px-20">
        <div className="sm:mt-10 mb-5">
          <h1 className="text-2xl sm:text-6xl text-gradient-soft sm:font-normal font-maragsa">
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

        <div className="my-6 -mx-8 sm:m-0 sm:mt-10 sticky top-0 overflow-x-hidden z-10 bg-tundora-900">
          <div className="animate-marquee flex sm:animate-none">
            <span className="p-3 text-sm sm:text-xl items-center gap-2 flex whitespace-nowrap">
              <span>
                <BsExclamationTriangleFill className="text-lg" />
              </span>
              <span>All events can be registered only one day in advance.</span>
            </span>
          </div>

          <div className="absolute top-0 left-0 p-3 text-sm sm:text-xl items-center gap-2 flex whitespace-nowrap animate-marquee2 sm:hidden">
            <span>
              <BsExclamationTriangleFill className="text-lg" />
            </span>
            <span>All events can be registered only one day in advance.</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-5 justify-center sm:justify-start">
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
