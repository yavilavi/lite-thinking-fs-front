import { IUser } from "./IUser";

export interface ILoginResponse {
  user: Omit<IUser, "password">,
  accessToken: string,
  authenticated: boolean
}
