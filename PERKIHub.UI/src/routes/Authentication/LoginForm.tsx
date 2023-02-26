import axios from 'axios';
import React from 'react';
import { Form, NavLink, useActionData, useNavigate } from 'react-router-dom';
import { ErrorResponse } from '../../lib/api/contracts';
import { useAuth } from '../../lib/hooks/useAuth';
import { isUser } from './functions';

export const LoginForm = () => {
  const authResult = useActionData();
  const { onChangeUser } = useAuth();
  const [errorMessage, setErrorMessage] = React.useState<string>('');
  const navigate = useNavigate();

  React.useEffect(() => {
    if (isUser(authResult)) {
      console.log(authResult);
      onChangeUser(authResult);
      navigate('/app/events');
    }

    if (axios.isAxiosError(authResult)) {
      const error = authResult.response?.data as ErrorResponse;
      setErrorMessage(error.title);
    }
  }, [authResult]);

  return (
    <div className="flex flex-col justify-center w-screen items-center h-screen">
      <div>
        <h1 className="text-4xl">Sign in to PerkiHub</h1>
      </div>
      <div className="px-8 py-8 flex">
        <Form method="post">
          <div className="flex flex-col w-96">
            {axios.isAxiosError(authResult) && (
              <p className="text-lightmaroon">{errorMessage}</p>
            )}
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
                className="p-2 block mt-1 bg-tundora-900  focus:border-lightmaroon border-2 border-solid border-cream focus:outline-none font-unbounded"
                name="password"
              />
            </div>

            <div className="w-24 mt-10 bg-lightmaroon group self-center">
              <button className="submit-button-outline">Sign in</button>
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
