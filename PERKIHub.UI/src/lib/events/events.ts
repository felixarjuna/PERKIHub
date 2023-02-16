import { ActionFunctionArgs, Params, redirect } from "react-router-dom";
import { getUser, getUsers, register, signIn, updateUser } from "../api/api";
import { RegisterRequest, SignInRequest, UpsertUserRequest } from "../api/contracts";

export const onEventSignIn = async () => {
  const signInRequest: SignInRequest = {
    email: 'felixarjuna@ymail.com',
    password: 'hello123',
  };

  await signIn(signInRequest);
  return redirect('/');
};

export const onLoadUsers = async () => {
  const users = await getUsers();
  return { users };
};

export const onCreateUser = async() => {
  const registerRequest: RegisterRequest = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }

  await register(registerRequest)
  return {user: registerRequest};
}

export const onLoadUser = async({userID}: Params<string>) => {
  if (userID != undefined) {
    const user = await getUser(userID);
    console.log(user);
    return user;
  }
}

export const onUpdateUser = async({request, params}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updateRequest = Object.fromEntries(formData) as unknown as UpsertUserRequest;

  await updateUser(updateRequest);
  return redirect(`/contacts/${params.contactId}`);
}