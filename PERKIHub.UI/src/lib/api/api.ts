import axios from "axios";
import { RegisterRequest, SignInRequest, UserResponse, UserUpdateRequest } from "./contracts";

// ---------------------------------------------------
//
//                   Authentication
//
// ---------------------------------------------------

export const signIn = async (request: SignInRequest) => {
  const response = await axios.post("http://localhost:5089/auth/login", request);
  return response.data;
}

export const register = async (request: RegisterRequest) => {
  const response = await axios.post("http://localhost:5089/auth/register", request);
  return response.data;
}

// ---------------------------------------------------
//
//                   Users
//
// ---------------------------------------------------
export const getUsers = async (): Promise<UserResponse[]> => {
  const response = await axios.get<UserResponse[]>("http://localhost:5089/users");
  return response.data;
}

export const getUser = async (userID: string): Promise<UserResponse> => {
  const response = await axios.get<UserResponse>(`http://localhost:5089/users?userID=${userID}`);
  return response.data;
}

export const updateUser = async(request: UserUpdateRequest) => {
  const response = await axios.put(`http://localhost:5089/users?userID=${request.id}`, request)
  return response.data;
}