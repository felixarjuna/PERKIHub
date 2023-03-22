import { BiChurch } from 'react-icons/bi';
import { BsPeopleFill } from 'react-icons/bs';
import { GiPublicSpeaker } from 'react-icons/gi';
import { RiCalendarEventFill, RiDiscussFill } from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
import { JoinEventRequest } from '../../../lib/api/contracts';
import { useJoinEvent } from '../../../lib/hooks/events/useEvents';
import { useAuth } from '../../../lib/hooks/useAuth';

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  speaker: string;
  topic: string;
  participants: string[];
}

export const EventCard = ({
  id,
  title,
  date,
  speaker,
  topic,
  participants,
}: EventCardProps) => {
  const { currentUser } = useAuth();
  const name = `${currentUser?.firstName} ${currentUser?.lastName}`;

  const navigate = useNavigate();
  const location = useLocation();
  const { onJoinEvent } = useJoinEvent();
  const onUserJoin = () => {
    // Check if user already login
    if (currentUser === null) {
      // If not navigate login page
      return navigate('/login', { state: { from: location }, replace: true });
    }

    const request: JoinEventRequest = {
      id: id,
      username: name,
    };
    onJoinEvent.mutate(request);
  };

  const eventDate = new Date(date);
  return (
    <div className="sm:my-10 bg-cream border-2 border-cream w-96">
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
            <p className="opacity-80 text-[0.7rem] font-unbounded">
              {eventDate.toLocaleString()}
            </p>
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
            <p className="opacity-80 text-[0.7rem] font-unbounded">
              {participants.length}
            </p>
          </div>
        </div>

        <div className="flex justify-between flex-col sm:flex-row gap-3">
          <div className="bg-cream w-full sm:w-24">
            <button
              className={
                participants.includes(name)
                  ? 'button-cream hover:translate-x-0 hover:translate-y-0'
                  : 'button-maroon text-[1rem]'
              }
              onClick={onUserJoin}
              disabled={participants.includes(name)}
            >
              {participants.includes(name) ? `Joined` : 'Join'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
