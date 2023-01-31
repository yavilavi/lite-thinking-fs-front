import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { IUser } from "../../types/IUser";
import { ILoginResponse } from "../../services/types";
import { PURGE } from "redux-persist";

export interface AuthState {
  isAuthenticated: boolean;
  userData: Omit<IUser, "password"> | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  userData: null,
  accessToken: localStorage.getItem("accessToken")
};

export const loginSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setAuthData: (
      state,
      action: PayloadAction<ILoginResponse>
    ) => {
      state.userData = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = action.payload.authenticated;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(PURGE, () => {
      return initialState;
    });
  }
});

export const { setAuthData } = loginSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// @ts-ignore - TS18047: 'state.auth.userData' is possibly 'null'.
export const selectAuth = (state: RootState) => state.auth;
// @ts-ignore - TS18047: 'state.auth.userData' is possibly 'null'.
export const selectRole = (state: RootState) => state.auth.userData.role;
export default loginSlice.reducer;
