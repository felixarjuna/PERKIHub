import axios, { AxiosResponse } from "axios";
import { CreateEventRequest, RegisterRequest, SignInRequest, UpsertUserRequest, UserResponse } from "./contracts";

// ----------------------------------------------------------------------------
//
//                               Authentication
//
// -----------------------------------------------------------------------------

export const signIn = async (request: SignInRequest): Promise<UserResponse> => {
  const response = await axios.post<SignInRequest, AxiosResponse<UserResponse>>("http://localhost:5089/auth/login", request);
  return response.data;
}

export const register = async (request: RegisterRequest): Promise<UserResponse> => {
  const response = await axios.post("http://localhost:5089/auth/register", request);
  return response.data;
}

// -----------------------------------------------------------------------------
//
//                                    Users
//
// -----------------------------------------------------------------------------
export const getUsers = async (query: string): Promise<UserResponse[]> => {
  console.log(query);
  const response = await axios.get<UserResponse[]>("http://localhost:5089/users");
  return response.data;
}

export const getUser = async (userID: string): Promise<UserResponse> => {
  const response = await axios.get<UserResponse>(`http://localhost:5089/users/${userID}`);
  return response.data;
}

export const updateUser = async(request: UpsertUserRequest) => {
  const response = await axios.put(`http://localhost:5089/users/${request.id}`, request)
  return response.data;
}

export const deleteUser = async(userID: string) => {
  const response = await axios.delete(`http://localhost:5089/users/${userID}`);
  return response.data;
}

// -----------------------------------------------------------------------------
//
//                                    Event
//
// -----------------------------------------------------------------------------
export const createEvent = async(request: CreateEventRequest) => {
  const response = await axios.post("http://localhost:5089/events", request);
  return response.data;
}