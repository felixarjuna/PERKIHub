import axios from "axios";
import { RegisterRequest, SignInRequest } from "./contracts";

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
  const response = await axios.post("http://localhost:5089//auth/register", request);
  return response.data;
}