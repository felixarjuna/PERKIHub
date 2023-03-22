import { BsFillCalendarPlusFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useEvents } from '../../../lib/hooks/events/useEvents';
import { useAuth } from '../../../lib/hooks/useAuth';
import { EventCard } from '../Cards/EventCard';

const AUTHORIZED_USERS = ['Felix Arjuna'];

export const Events = () => {
  const { currentUser } = useAuth();
  const name = `${currentUser?.firstName} ${currentUser?.lastName}`;

  const navigate = useNavigate();

  const { events } = useEvents('');

  return (
    <div className="p-8 sm:px-20">
      <div className="sm:mt-10 mb-5">
        <h1 className="text-3xl sm:text-6xl text-gradient">Events</h1>
      </div>

      {AUTHORIZED_USERS.includes(name) ? (
        <div className="my-7 w-36 sm:w-44 bg-lightmaroon">
          <div
            className="mt-4 flex items-center gap-3 cursor-pointer button-cream w-36 sm:w-44 justify-center"
            onClick={() => navigate('create')}
          >
            <BsFillCalendarPlusFill />
            <p>New event</p>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="flex flex-wrap gap-7 justify-center sm:justify-start">
        {events?.sort((a, b) => {
          if (a.date > b.date) return -1
          return 1
        }).map(event => (
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
