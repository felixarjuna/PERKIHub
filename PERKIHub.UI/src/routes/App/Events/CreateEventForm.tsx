import { Form, useNavigate } from "react-router-dom";

export const CreateEventForm = () => {
  const navigate = useNavigate();

  return (
    <div className="ml-20 mt-10">
      <Form method="post">
        <h2 className="text-7xl text-gradient">Create new event</h2>
        <div className="w-96">
          <div className="flex gap-1 flex-col justify-center mt-8">
            <label
              htmlFor="title"
              className="flex items-start font-unbounded font-light text-sm"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              className="input"
              required
            />
          </div>
          <div className="flex gap-1 flex-col my-5">
            <label htmlFor="date" className="font-unbounded font-light text-sm">
              Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              className="input"
              required
            />
          </div>
          <div className="flex gap-1 flex-col my-5">
            <label
              htmlFor="speaker"
              className="font-unbounded font-light text-sm"
            >
              Speaker
            </label>
            <input
              type="text"
              id="speaker"
              name="speaker"
              className="input"
              required
            />
          </div>
          <div className="flex gap-1 flex-col my-5">
            <label
              htmlFor="topic"
              className="font-unbounded font-light text-sm"
            >
              Topic
            </label>
            <input
              type="text"
              id="topic"
              name="topic"
              className="input"
              required
            />
          </div>

          <div className="mt-10 flex gap-5">
            <div className="bg-cream w-24">
              <button className="button-gray" onClick={() => navigate(-1)}>
                Back
              </button>
            </div>
            <div className="bg-lightmaroon w-24">
              <button className="button-cream">Create</button>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
