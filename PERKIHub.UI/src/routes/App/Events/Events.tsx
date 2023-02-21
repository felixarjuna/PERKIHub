import { BsFillCalendarPlusFill } from 'react-icons/bs';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { EventsData } from '../../../lib/api/contracts';
import { EventCard } from '../Cards/EventCard';

export const Events = () => {
  const navigate = useNavigate();

  const { events } = useLoaderData() as EventsData;
  console.log(events);

  return (
    <div>
      <div className="mt-10">
        <h1 className="text-6xl text-gradient">Events</h1>
        <h3 className="mt-10 text-4xl">This Week</h3>
      </div>

      <div className="mt-7 w-44 bg-lightmaroon">
        <div
          className="mt-4 flex items-center gap-3 cursor-pointer button-cream w-44 justify-center"
          onClick={() => navigate('create')}
        >
          <BsFillCalendarPlusFill />
          <p>New event</p>
        </div>
      </div>

      <div className="flex gap-10">
        {events.map((event) => (
          <EventCard
            title={event.title}
            date={event.date}
            speaker={event.speaker}
            topic={event.topic}
          />
        ))}
      </div>
    </div>
  );
};
