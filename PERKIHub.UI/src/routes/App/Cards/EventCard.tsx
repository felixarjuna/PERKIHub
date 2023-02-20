import { BiChurch } from 'react-icons/bi';
import { GiPublicSpeaker } from 'react-icons/gi';
import { RiCalendarEventFill, RiDiscussFill } from 'react-icons/ri';

export const EventCard = () => {
  const date = new Date();

  const onUserJoin = () => {
    alert('You are part of the event now! 🎉');
  };

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
            <h3 className="text-3xl">Saturday Service</h3>
            <div className="flex items-center gap-2 mt-3">
              <RiCalendarEventFill />
              <p className="opacity-80 text-[0.7rem] font-unbounded">
                {date.toLocaleDateString()}
              </p>
            </div>
            <div className="my-1 flex items-center gap-2">
              <GiPublicSpeaker />
              <p className="opacity-80 text-[0.7rem] font-unbounded">
                Pdt. John Kusuma
              </p>
            </div>
            <div className="flex items-center gap-2">
              <RiDiscussFill />
              <p className="opacity-80 text-[0.7rem] font-unbounded">
                Time Management
              </p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <p>Participants</p>
            <button className="submit-button text-[1rem]" onClick={onUserJoin}>
              Join
            </button>
          </div>
        </div>
      </div>

  );
};
