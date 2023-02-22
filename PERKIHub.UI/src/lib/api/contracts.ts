export interface ErrorResponse {
  status: number,
  title: string, 
  traceId: string, 
  type: string
}

// ---------------------------------------------------
//
//                   Authentication
//
// ---------------------------------------------------
export interface SignInRequest{
  email: string,
  password: string,
}

export interface RegisterRequest{
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

// ---------------------------------------------------
//
//                      Users
//
// ---------------------------------------------------
export interface UserResponse{
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  token: string,
}

export interface UpsertUserRequest{
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

export interface User{
  firstName: string,
  lastName: string,
  email: string,
}

// -----------------------------------------------------------------------------
//
//                                    Event
//
// -----------------------------------------------------------------------------
export interface CreateEventRequest{
  title: string,
  date: Date,
  speaker: string,
  topic: string
}

export interface UpsertEventRequest{
  id: string,
  title: string,
  date: Date,
  speaker: string,
  topic: string,
  participants: string[]
}

export interface EventResponse{
  id: string,
  title: string,
  date: string,
  speaker: string,
  topic: string,
  participants: string[]
};

export type EventsData = {
  events: EventResponse[],
  q: string
};