import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../redux/store';
import { IUser } from "../../types/IUser";
import { ILoginResponse } from "../../services/types";

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
      console.log("storeUserData triggered");
      localStorage.setItem('accessToken', action.payload.accessToken);
      state.userData = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = action.payload.authenticated;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    storeUserData: (state, action: PayloadAction<Omit<IUser, "password">>) => {
      state.userData = action.payload;
      state.isAuthenticated = true;
      state.accessToken = localStorage.getItem('accessToken');
    },
    logout: (state) => {
      console.log("removeSession");
      localStorage.removeItem("accessToken");
      state.isAuthenticated = false;
      state.userData = null;
      state.accessToken = null;
    }
  }
});

export const { logout, storeUserData, setAuthData } = loginSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// @ts-ignore - TS18047: 'state.auth.userData' is possibly 'null'.
export const selectAuth = (state: RootState) => state.auth;
// @ts-ignore - TS18047: 'state.auth.userData' is possibly 'null'.
export const selectRole = (state: RootState) => state.auth.userData.role;
export default loginSlice.reducer;
