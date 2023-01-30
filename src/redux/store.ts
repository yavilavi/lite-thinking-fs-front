import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/login/loginSlice'
import { setupListeners } from '@reduxjs/toolkit/query';
import { authService } from "../services/AuthService";
import { companyService } from "../services/CompanyService";

export const store = configureStore({
  reducer: {
    auth: loginReducer,
    [authService.reducerPath]: authService.reducer,
    [companyService.reducerPath]: companyService.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authService.middleware,
      companyService.middleware
    ]),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
