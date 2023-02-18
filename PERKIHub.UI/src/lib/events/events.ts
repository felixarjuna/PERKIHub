import { ActionFunctionArgs, Params, redirect } from "react-router-dom";
import { deleteUser, getUser, getUsers, register, signIn, updateUser } from "../api/api";
import { RegisterRequest, SignInRequest, UpsertUserRequest } from "../api/contracts";

export const onEventSignIn = async ({request, params}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const signInRequest = Object.fromEntries(formData) as unknown as SignInRequest;

  await signIn(signInRequest);
  return redirect('/app');
};

export const onEventRegister = async ({request, params}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const registerRequest = Object.fromEntries(formData) as unknown as RegisterRequest;

  await register(registerRequest);
  return redirect('/app');
}

export const onLoadUsers = async ({request}: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const users = await getUsers(q ?? "");
  return { users, q };
};

export const onCreateUser = async() => {
  const registerRequest: RegisterRequest = {
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  }

  const user = await register(registerRequest)
  return redirect(`/users/${user.id}/edit`);
}

export const onLoadUser = async({userID}: Params<string>) => {
  if (userID != undefined) {
    const user = await getUser(userID);
    return user;
  }
}

export const onUpdateUser = async({request, params}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updateRequest = Object.fromEntries(formData) as unknown as UpsertUserRequest;

  await updateUser(updateRequest);
  return redirect(`/users/${params.userID}`);
}

export const onDeleteUser = async({userID}: Params<string>) => {
  if (userID != undefined)
    await deleteUser(userID);
}