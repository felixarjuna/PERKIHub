import { redirect } from "react-router-dom";
import { signIn } from "../api/api";
import { SignInRequest } from "../api/contracts";

export const onEventSignIn = async () => {
  const signInRequest: SignInRequest = {
    email: 'felixarjuna@ymail.com',
    password: 'hello123',
  };

  await signIn(signInRequest);
  return redirect('/');
};