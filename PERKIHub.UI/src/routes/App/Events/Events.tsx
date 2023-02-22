import { BsFillCalendarPlusFill } from 'react-icons/bs';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { EventsData } from '../../../lib/api/contracts';
import { useAuth } from '../../../lib/hooks/useAuth';
import { EventCard } from '../Cards/EventCard';

const AUTHORIZED_USERS = ['Felix Arjuna'];

export const Events = () => {
  const user = useAuth();
  const name = `${user?.currentUser?.firstName} ${user?.currentUser?.lastName}`;

  const navigate = useNavigate();

  const { events } = useLoaderData() as EventsData;

  return (
    <div>
      <div className="mt-10">
        <h1 className="text-6xl text-gradient">Events</h1>
        <h3 className="mt-10 text-4xl">This Week</h3>
      </div>

      {AUTHORIZED_USERS.includes(name) ? (
        <div className="mt-7 w-44 bg-lightmaroon">
          <div
            className="mt-4 flex items-center gap-3 cursor-pointer button-cream w-44 justify-center"
            onClick={() => navigate('create')}
          >
            <BsFillCalendarPlusFill />
            <p>New event</p>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="flex gap-10">
        {events.map(event => (
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
};
