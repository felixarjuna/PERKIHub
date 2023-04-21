import axios from "axios";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Form, NavLink, useActionData, useNavigate } from "react-router-dom";
import { ErrorResponse } from "../../lib/api/contracts";
import { useAuth } from "../../lib/hooks/useAuth";
import { isUser } from "./functions";

export const LoginForm = () => {
  const authResult = useActionData();
  const { onChangeUser } = useAuth();
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (isUser(authResult)) {
      onChangeUser(authResult);
      navigate("/app/events");
    }

    if (axios.isAxiosError(authResult)) {
      const error = authResult.response?.data as ErrorResponse;
      setErrorMessage(error.title);
    }
    setIsLoading(false);
  }, [authResult]);

  return (
    <>
      {isLoading && (
        <div className="flex gap-3 items-center justify-center bg-tundora-800 w-screen h-screen z-10 fixed inset-0">
          <AiOutlineLoading3Quarters className="animate-spin" />
          <p>Logging in</p>
        </div>
      )}
      <div className="flex flex-col justify-center w-screen h-screen p-8">
        <div>
          <h1 className="text-2xl sm:text-4xl sm:text-center">
            Sign in to <span className="text-gradient-soft">PerkiHub</span>
          </h1>
        </div>

        <div className="mt-2 mb-8 sm:my-10 flex">
          <Form
            method="post"
            className="w-screen sm:max-w-lg sm:mx-auto"
            onSubmit={() => setIsLoading(true)}
          >
            <div className="flex flex-col">
              {axios.isAxiosError(authResult) && (
                <p className="text-lightmaroon">{errorMessage}</p>
              )}
              <div className="flex flex-col">
                <label
                  className="my-2 flex items-start font-unbounded font-light text-[0.8rem] sm:text-sm"
                  htmlFor="email-field"
                >
                  Username or email address
                </label>
                <input
                  id="email-field"
                  type="text"
                  className="text-input"
                  name="email"
                />
              </div>

              <div className="flex flex-col mt-4">
                <label
                  className="my-2 flex items-start font-unbounded font-light text-[0.8rem] sm:text-sm"
                  htmlFor="password-field"
                >
                  Password
                </label>
                <input
                  id="password-field"
                  type="password"
                  className="text-input text-2xl"
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
          <p className="text-center">
            New to PerkiHub?{" "}
            <NavLink to="/register" className="underline underline-offset-2">
              Create an account.
            </NavLink>
          </p>
        </div>
      </div>
    </>
  );
};
