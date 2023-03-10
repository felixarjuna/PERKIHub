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
    <div className="flex flex-col justify-center w-screen h-screen p-8">
      <div className="mt-10 sm:m-0">
        <h1 className="text-2xl sm:text-4xl sm:text-center">
          Register to <span className="text-gradient-soft">PerkiHub</span>
        </h1>
      </div>

      <div className="mb-8 flex">
        <Form
          method="post"
          className="mt-5 sm:mt-10 w-screen sm:max-w-lg sm:mx-auto"
        >
          <div className="flex flex-col">
            {authResult != undefined && (
              <div className="p-2 border-[1px] sm:border-2 border-lightmaroon mb-4">
                {message}
              </div>
            )}

            <div className="flex-1 flex gap-3 flex-col sm:flex-row">
              <div className="w-full sm:w-1/2">
                <label
                  className="sm:my-2 flex items-start font-unbounded font-light text-[0.8rem] sm:text-sm"
                  htmlFor="firstname"
                >
                  First name
                </label>
                <input
                  id="firstname"
                  type="text"
                  className="text-input w-full"
                  name="firstname"
                  required
                />
              </div>
              <div className="sm:w-1/2">
                <label
                  className="sm:my-2 flex items-start font-unbounded font-light text-[0.8rem] sm:text-sm"
                  htmlFor="lastname"
                >
                  Last name
                </label>
                <input
                  id="lastname"
                  type="text"
                  className="text-input w-full"
                  name="lastname"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col my-4">
              <label
                className="sm:my-2 flex items-start font-unbounded font-light text-[0.8rem] sm:text-sm"
                htmlFor="email-field"
              >
                Username or email address
              </label>
              <input
                id="email-field"
                type="text"
                className="text-input"
                name="email"
                required
              />
            </div>

            <div className="flex flex-col">
              <label
                className="sm:my-2 flex items-start font-unbounded font-light text-[0.8rem] sm:text-sm"
                htmlFor="password-field"
              >
                Password
              </label>
              <input
                id="password-field"
                type="password"
                className="text-input"
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

      <div className="sm:mt-10 text-center">
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
