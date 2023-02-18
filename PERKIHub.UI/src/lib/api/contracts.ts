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