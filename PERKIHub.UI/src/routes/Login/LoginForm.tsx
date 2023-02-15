import { Form } from 'react-router-dom';

export const LoginForm = () => {
  return (
    <div>
      <h1 className="text-2xl my-5">Sign in to PerkiHub</h1>

      <div className=" px-8 py-8 rounded-md">
        <Form method="post">
          <div className="flex flex-col w-64 ">
            <label className="my-2 flex items-start" htmlFor="email-field">
              Username or email address
            </label>
            <input
              id="email-field"
              type="text"
              className="p-2 rounded-lg block mt-1"
              name="email"
            />
          </div>

          <div className="flex flex-col mt-4">
            <label className="my-2 flex items-start" htmlFor="password-field">
              Password
            </label>
            <input
              id="password-field"
              type="password"
              className="p-2 rounded-lg block mt-1"
              name="password"
            />
          </div>
          <button className="mt-8 hover:border-2 hover:border-falu-red-700 border-2 px-5 py-2 rounded-md bg-tundora-800 border-tundora-800 transition-colors duration-300">
            Sign in
          </button>
        </Form>
      </div>
    </div>
  );
};
