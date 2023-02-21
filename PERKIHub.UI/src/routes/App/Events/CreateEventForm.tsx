import { Form } from 'react-router-dom';

export const CreateEventForm = () => {
  return (
    <div className="mt-10">
      <Form>
        <h2 className="text-7xl text-gradient">Create new event</h2>
        <div className="w-96">
          <div className="flex gap-1 flex-col justify-center mt-8">
            <label
              htmlFor="title"
              className="flex items-start font-unbounded font-light text-sm"
            >
              Title
            </label>
            <input type="text" id="title" name="title" className="input" />
          </div>
          <div className="flex gap-1 flex-col my-5">
            <label htmlFor="date" className="font-unbounded font-light text-sm">
              Date
            </label>
            <input type="text" id="date" name="date" className="input" />
          </div>
          <div className="flex gap-1 flex-col my-5">
            <label
              htmlFor="speaker"
              className="font-unbounded font-light text-sm"
            >
              Speaker
            </label>
            <input type="text" id="speaker" name="speaker" className="input" />
          </div>
          <div className="flex gap-1 flex-col my-5">
            <label
              htmlFor="topic"
              className="font-unbounded font-light text-sm"
            >
              Topic
            </label>
            <input type="text" id="topic" name="topic" className="input" />
          </div>

          <div className="mt-10 bg-cream w-24 h-14">
            <button className="submit-button">Create</button>
          </div>
        </div>
      </Form>
    </div>
  );
};
