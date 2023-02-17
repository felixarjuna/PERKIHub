import { Form } from 'react-router-dom';

export const LoginForm = () => {
  return (
    <div className="flex flex-col justify-center w-screen items-center h-screen">
      <div>
        <h1 className="text-2xl">Sign in to PerkiHub</h1>
      </div>
      <div className="px-8 py-8 rounded-md">
        <Form method="post">
          <div className="flex flex-col w-64">
            <label className="my-2 flex items-start" htmlFor="email-field">
              Username or email address
            </label>
            <input
              id="email-field"
              type="text"
              className="p-2 rounded-lg block mt-1 bg-tundora-100 focus:border-falu-red-800 border-2 border-solid focus:outline-none"
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
              className="p-2 rounded-lg block mt-1 bg-tundora-100  focus:border-falu-red-800 border-2 border-solid focus:outline-none"
              name="password"
            />
          </div>
          <div className="flex justify-center">
            <button className="mt-8 hover:border-2 hover:border-falu-red-800 border-2 px-5 py-2 rounded-md bg-tundora-100 border-tundora-100 transition-colors duration-300">
              Sign in
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};
