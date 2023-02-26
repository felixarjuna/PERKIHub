import axios, { AxiosResponse } from 'axios';
import {
  CreateEventRequest,
  EventResponse,
  JoinEventRequest,
  RegisterRequest,
  SignInRequest,
  UpsertUserRequest,
  UserResponse,
} from './contracts';

const API_URL = import.meta.env.VITE_API_URL;
const apiClient = axios.create({
  baseURL: API_URL,
});

// ----------------------------------------------------------------------------
//
//                               Authentication
//
// -----------------------------------------------------------------------------

export const signIn = async (request: SignInRequest): Promise<UserResponse> => {
  const response = await apiClient.post<
    SignInRequest,
    AxiosResponse<UserResponse>
  >('/api/auth/login', request);
  return response.data;
};

export const register = async (
  request: RegisterRequest
): Promise<UserResponse> => {
  const response = await apiClient.post('/api/auth/register', request);
  return response.data;
};

// -----------------------------------------------------------------------------
//
//                                    Users
//
// -----------------------------------------------------------------------------
export const getUsers = async (query: string): Promise<UserResponse[]> => {
  console.log(query);
  const response = await apiClient.get<UserResponse[]>('/api/users');
  return response.data;
};

export const getUser = async (userID: string): Promise<UserResponse> => {
  const response = await apiClient.get<UserResponse>(`/api/users/${userID}`);
  return response.data;
};

export const updateUser = async (request: UpsertUserRequest) => {
  const response = await apiClient.put(`/api/users/${request.id}`, request);
  return response.data;
};

export const deleteUser = async (userID: string) => {
  const response = await apiClient.delete(`/api/users/${userID}`);
  return response.data;
};

// -----------------------------------------------------------------------------
//
//                                    Event
//
// -----------------------------------------------------------------------------
export const createEvent = async (request: CreateEventRequest) => {
  const response = await apiClient.post('/api/events', request);
  return response.data;
};

export const getEvents = async (query: string): Promise<EventResponse[]> => {
  const response = await apiClient.get('/api/events');
  return response.data;
};

export const joinEvent = async (
  request: JoinEventRequest
): Promise<EventResponse> => {
  const response = await apiClient.post('/api/events/join', request);
  console.log(response.data);
  return response.data;
};
