import { BsFillCalendarPlusFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { EventCard } from '../Cards/EventCard';

export const Events = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="mt-10">
        <h1 className="text-6xl text-lightmaroon">Events</h1>
        <h3 className="mt-10 text-4xl">This Week</h3>
      </div>

      <div
        className="mt-4 flex items-center gap-3 cursor-pointer"
        onClick={() => navigate('create')}
      >
        <BsFillCalendarPlusFill />
        <p>New event</p>
      </div>

      <div>
        <EventCard />
      </div>
    </div>
  );
};
