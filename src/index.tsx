import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter, Navigate,
  RouterProvider,
} from "react-router-dom";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import App from './App';
import reportWebVitals from './reportWebVitals';

import PrivatePage from "./features/wrappers/PrivatePage";
import { createTheme, LinearProgress, ThemeProvider } from "@mui/material";
import { LayoutContextProvider } from "./context/layoutContext";
import ViewCompany from "./features/company/ViewCompany";

const Login = React.lazy(() => import ("./features/login/Login"));
const ErrorPage = React.lazy(() => import ("./features/error-page/ErrorPage"));
const Company = React.lazy(() => import ("./features/company/Company"));
const Stock = React.lazy(() => import ("./features/company/stock/Stock"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "login",
        element: (
          <Login/>
        ),
      },
      {
        path: "/",
        element: (
          <PrivatePage>
            <Navigate to="/company"/>
          </PrivatePage>
        )
      },
      {
        path: "/company",
        element: (
          <PrivatePage>
            <Company/>
          </PrivatePage>
        )
      },

      {
        path: "/company/view/:NIT",
        element: (
          <PrivatePage>
            <ViewCompany/>
          </PrivatePage>
        )
      },
      {
        path: "/stock",
        element: (
          <PrivatePage>
            <Stock/>
          </PrivatePage>
        )
      },

    ]
  },
]);

const container = document.getElementById('root')!;
const root = createRoot(container);
const theme = createTheme();

root.render(
  <React.StrictMode>
    <Provider store={ store }>
      <LayoutContextProvider>
        <ThemeProvider theme={ theme }>
          <React.Suspense fallback={ <LinearProgress/> }>
            <RouterProvider router={ router }/>
          </React.Suspense>
        </ThemeProvider>
      </LayoutContextProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
