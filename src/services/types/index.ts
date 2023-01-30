import { IUser } from "../../types/IUser";

export interface ILoginResponse {
  user: Omit<IUser, "password">,
  accessToken: string,
  authenticated: boolean
}

export interface ILoginRequest {
  email: string,
  password: string,
}

export interface IUserResponse extends Omit<IUser, "password"> {
}
