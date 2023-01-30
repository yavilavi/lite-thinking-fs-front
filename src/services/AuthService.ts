import {
  createApi,
  EndpointDefinitions,
  fetchBaseQuery
} from '@reduxjs/toolkit/query/react'
import { ILoginRequest, IUserResponse } from "./types";
import { RootState } from "../redux/store";

export const authService = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token: string | null = (getState() as unknown as RootState).auth.accessToken ?? localStorage.getItem('accessToken');
      if (token) {
        headers.set('authorization', `bearer ${ token }`);
      }
    }
  }),
  endpoints: (builder): EndpointDefinitions => ({
    login: builder.mutation<IUserResponse, ILoginRequest>({
      query: (credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      })
    }),
    getUserData: builder.mutation<IUserResponse, undefined>({
      query: () => `user/me`,
    }),
  })
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
// @ts-ignore  S2339: Property 'useGetUserDataQuery' does not exist on type 'Api  , EndpointDefinitions, "authApi", never, unique symbol | unique symbol>'.
export const { useGetUserDataMutation, useLoginMutation } = authService;
