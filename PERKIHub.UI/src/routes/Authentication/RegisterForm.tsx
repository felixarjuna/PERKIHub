import axios from 'axios';
import React from 'react';
import { Form, NavLink, useActionData } from 'react-router-dom';
import { ErrorResponse } from '../../lib/api/contracts';
import { User } from '../../lib/models/User';

export const RegisterForm = () => {
  const authResult = useActionData();
  const [message, setMessage] = React.useState<string>('');

  React.useEffect(() => {
    if (authResult instanceof User) {
      setMessage('Register successful. Please Login.');
    }

    if (axios.isAxiosError(authResult)) {
      const error = authResult.response?.data as ErrorResponse;
      return setMessage(error.title);
    }
  }, [authResult]);

  return (
    <div className="flex flex-col justify-center w-screen items-center h-screen">
      <div>
        <h1 className="text-4xl">Register to PerkiHub</h1>
      </div>
      <div className="px-8 py-8 flex">
        <Form method="post">
          <div className="flex flex-col w-96">
            {authResult != undefined && (
              <div className="p-2 border-2 border-lightmaroon mb-4">
                {message}
              </div>
            )}

            <div className="flex gap-3">
              <div className="w-1/2">
                <label
                  className="my-2 flex items-start font-unbounded font-light text-sm"
                  htmlFor="firstname"
                >
                  First name
                </label>
                <input
                  id="firstname"
                  type="text"
                  className="p-2 block mt-1 bg-tundora-900 focus:border-lightmaroon border-2 border-solid border-cream focus:outline-none w-full"
                  name="firstname"
                  required
                />
              </div>
              <div>
                <label
                  className="my-2 flex items-start font-unbounded font-light text-sm"
                  htmlFor="lastname"
                >
                  Last name
                </label>
                <input
                  id="lastname"
                  type="text"
                  className="p-2 block mt-1 bg-tundora-900 focus:border-lightmaroon border-2 border-solid border-cream focus:outline-none w-full"
                  name="lastname"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col my-4">
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
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                className="my-2 flex items-start font-unbounded font-light text-sm"
                htmlFor="password-field"
              >
                Password
              </label>
              <input
                id="password-field"
                type="password"
                className="p-2 block mt-1 bg-tundora-900  focus:border-lightmaroon border-2 border-solid border-cream focus:outline-none font-unbounded"
                name="password"
                required
              />
            </div>

            <div className="w-24 mt-10 bg-lightmaroon group self-center">
              <button className="submit-button-outline">Register</button>
            </div>
          </div>
        </Form>
      </div>

      <div>
        <p>
          Already have an account?{' '}
          <NavLink to="/login" className="underline underline-offset-2">
            Log in.
          </NavLink>
        </p>
      </div>
    </div>
  );
};
