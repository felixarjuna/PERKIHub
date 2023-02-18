import { Form, NavLink } from 'react-router-dom';

export const LoginForm = () => {
  return (
    <div className="flex flex-col justify-center w-screen items-center h-screen">
      <div>
        <h1 className="text-4xl">Sign in to PerkiHub</h1>
      </div>
      <div className="px-8 py-8 flex">
        <Form method="post">
          <div className="flex flex-col w-96">
            <div className="flex flex-col">
              <label
                className="my-2 flex items-start font-unbounded font-light text-sm"
                htmlFor="email-field"
              >
                Username or email address
              </label>
              <input
                id="email-field"
                type="text"
                className="p-2 block mt-1 bg-tundora-900 focus:border-lightmaroon border-2 border-solid border-cream focus:outline-none"
                name="email"
              />
            </div>

            <div className="flex flex-col mt-4">
              <label
                className="my-2 flex items-start font-unbounded font-light text-sm"
                htmlFor="password-field"
              >
                Password
              </label>
              <input
                id="password-field"
                type="password"
                className="p-2 block mt-1 bg-tundora-900  focus:border-lightmaroon border-2 border-solid border-cream focus:outline-none"
                name="password"
              />
            </div>

            <div className="w-24 mt-10 bg-lightmaroon group self-center">
              <button className="px-3 py-2 border-2 border-cream w-24 flex items-center justify-center bg-transparent translate-x-2 translate-y-2 duration-500 text-cream -rotate-1 group-hover:-translate-x-1 group-hover:-translate-y-1">
                Sign in
              </button>
            </div>
          </div>
        </Form>
      </div>

      <div>
        <p>
          New to PerkiHub?{' '}
          <NavLink to="/register" className="underline underline-offset-2">
            Create an account.
          </NavLink>
        </p>
      </div>
    </div>
  );
};
