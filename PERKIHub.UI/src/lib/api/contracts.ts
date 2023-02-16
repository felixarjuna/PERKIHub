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
  password: string,
}

export interface UserUpdateRequest{
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}