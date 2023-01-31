import { configureStore } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import loginReducer from '../features/login/loginSlice'
import { setupListeners } from '@reduxjs/toolkit/query';
import { authService } from "../services/AuthService";
import { companyService } from "../services/CompanyService";

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [ authService.reducerPath, companyService.reducerPath ],
}

const persistedReducer = persistReducer(persistConfig, loginReducer)

export const store = configureStore({
  reducer: {
    auth: persistedReducer,
    [authService.reducerPath]: authService.reducer,
    [companyService.reducerPath]: companyService.reducer
  },

  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [ FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER ],
      }
    }).concat([
      authService.middleware,
      companyService.middleware
    ]),

});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>;
