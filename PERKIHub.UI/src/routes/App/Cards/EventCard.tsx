import { BiChurch } from 'react-icons/bi';
import { GiPublicSpeaker } from 'react-icons/gi';
import { RiCalendarEventFill, RiDiscussFill } from 'react-icons/ri';
import { JoinEventRequest } from '../../../lib/api/contracts';
import { useJoinEvent } from '../../../lib/hooks/events/useEvents';
import { useAuth } from '../../../lib/hooks/useAuth';

interface EventCardProps {
  id: string;
  title: string;
  date: string;
  speaker: string;
  topic: string;
}

export const EventCard = ({
  id,
  title,
  date,
  speaker,
  topic,
}: EventCardProps) => {
  const { onJoinEvent } = useJoinEvent();
  const user = useAuth();
  const name = `${user?.currentUser?.firstName} ${user?.currentUser?.lastName}`;

  const onUserJoin = () => {
    const request: JoinEventRequest = {
      id: id,
      username: name,
    };
    onJoinEvent.mutate(request);
  };

  const eventDate = new Date(date);
  return (
    <div className="mt-10 bg-cream border-2 border-cream w-96">
      <div className="w-full border-4 border-cream p-10 bg-tundora-700 -translate-x-2 -translate-y-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full border-2 flex items-center justify-center bg-maroon border-maroon">
            <BiChurch />
          </div>
          <div>
            <p>Saturday / 15.30 - 17.00</p>
          </div>
        </div>

        <div className="my-5">
          <h3 className="text-3xl">{title}</h3>
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
        </div>

        <div className="flex justify-between items-center">
          <p>Participants</p>
          <div className="bg-cream w-24">
            <button className="button-maroon text-[1rem]" onClick={onUserJoin}>
              Join
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
