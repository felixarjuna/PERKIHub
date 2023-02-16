import { ActionFunctionArgs, Params, redirect } from "react-router-dom";
import { getUser, getUsers, register, signIn, updateUser } from "../api/api";
import { RegisterRequest, SignInRequest, UserUpdateRequest } from "../api/contracts";

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
    const user = await getUser(userID)
    return user;
  }
  return {
    "id": "81f36cba-ac33-46ac-8ccb-7ad27158af86",
    "firstName": "Felix",
    "lastName": "Arjuna",
    "email": "felixarjuna@ymail.com",
    "password": "hello123"
  };
}

export const onUpdateUser = async({request, params}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updateRequest = Object.fromEntries(formData) as unknown as UserUpdateRequest;

  await updateUser(updateRequest);
  return redirect(`/contacts/${params.contactId}`);
}