import { QueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { isEmpty } from "lodash";
import { ActionFunctionArgs, Params, redirect } from 'react-router-dom';
import {
  createEvent,
  deleteUser,
  getEvents,
  getUser,
  getUsers,
  register,
  signIn,
  updateUser
} from '../api/api';
import {
  CreateEventRequest,
  RegisterRequest,
  SignInRequest,
  UpsertUserRequest
} from '../api/contracts';
import { User } from '../models/User';

// ----------------------------------------------------------------------------
//
//                               Authentication
//
// -----------------------------------------------------------------------------

export const onEventSignIn =
  (queryClient: QueryClient) =>
  async ({
    request,
    params,
  }: ActionFunctionArgs): Promise<
    User | AxiosError<unknown, any> | undefined
  > => {
    const formData = await request.formData();
    const signInRequest = Object.fromEntries(
      formData
    ) as unknown as SignInRequest;
    const user = JSON.parse(localStorage.getItem('user') || '[]');
    if (!isEmpty(user)) {
      return user
    }
    try {
      const response = await signIn(signInRequest);
      const user = new User(
        response.firstName,
        response.lastName,
        response.email
      );
      localStorage.setItem('user', JSON.stringify(user));
      return user;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        return err;
      }
    }
  };

export const onEventRegister = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const registerRequest = Object.fromEntries(
    formData
  ) as unknown as RegisterRequest;

  try {
    const response = await register(registerRequest);
    const user = new User(
      response.firstName,
      response.lastName,
      response.email
    );
    localStorage.setItem('user', JSON.stringify(user));
    return user;
  } catch (err) {
    return err;
  }
};

// -----------------------------------------------------------------------------
//
//                                    Users
//
// -----------------------------------------------------------------------------
export const onLoadUsers = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const users = await getUsers(q ?? '');
  return { users, q };
};

export const onCreateUser = async () => {
  const registerRequest: RegisterRequest = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  const user = await register(registerRequest);
  return redirect(`/users/${user.id}/edit`);
};

export const onLoadUser = async ({ userID }: Params<string>) => {
  if (userID != undefined) {
    const user = await getUser(userID);
    return user;
  }
};

export const onUpdateUser = async ({ request, params }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const updateRequest = Object.fromEntries(
    formData
  ) as unknown as UpsertUserRequest;

  await updateUser(updateRequest);
  return redirect(`/users/${params.userID}`);
};

export const onDeleteUser = async ({ userID }: Params<string>) => {
  if (userID != undefined) await deleteUser(userID);
};

// -----------------------------------------------------------------------------
//
//                                    Event
//
// -----------------------------------------------------------------------------
export const onCreateEvent = async ({
  request,
  params,
}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const createEventRequest = Object.fromEntries(
    formData
  ) as unknown as CreateEventRequest;

  await createEvent(createEventRequest);

  return redirect('/app/events');
};

export const onLoadEvents = async ({ request }: ActionFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  const events = await getEvents(q ?? '');
  return { events, q };
};

export const onUserJoin = () => {};
