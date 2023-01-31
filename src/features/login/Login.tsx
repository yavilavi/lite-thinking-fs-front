import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from "./components/CopyRght";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Navigate, useNavigate } from "react-router-dom";
import { selectAuth, setAuthData } from "./loginSlice";
import { useLoginMutation } from "../../services/AuthService";
import { ChangeEvent, useEffect, useState } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert } from "@mui/material";
import { toast } from "react-toastify";
import { ILoginResponse } from "../../services/types";

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector(selectAuth);
  const [ loginData, setLoginData ] = useState({
    email: "admin@mail.com",
    password: "password"
  });

  const [ login, { isLoading: loginLoading } ] = useLoginMutation();

  const handleOnChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const newLoginData = { ...loginData, [event.currentTarget.id]: event.currentTarget.value }
    setLoginData(newLoginData)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      email: data.get('email') as string,
      password: data.get('password') as string
    }
    try {
      const response = await toast.promise(login(credentials).unwrap(),
        {
          pending: 'Authenticating with server...',
          success: '👌 Authenticated successfully redirecting...',
          error: 'Authentication failed 🤯'
        })
      setTimeout(() => {
        dispatch(setAuthData(response as ILoginResponse))
      }, 2500)

    } catch (err) {
      console.log(err)
    }
  };

  return (
    !auth.isAuthenticated ?
      <Container component="main" maxWidth="xs">
        <Box
          sx={ {
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          } }
        >
          <Avatar sx={ { m: 1, bgcolor: 'secondary.main' } }>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Alert icon={ false } severity="info">
            use <strong>admin@mail.com</strong> or <strong>external@mail.com</strong> with "<strong>password</strong>"
            as
            password to login
          </Alert>
          <Box component="form" onSubmit={ handleSubmit } noValidate sx={ { mt: 1 } }>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="algo"
              autoFocus
              onChange={ handleOnChange }
              value={ loginData.email }
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={ handleOnChange }
              value={ loginData.password }
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={ { mt: 3, mb: 2 } }
              loading={ loginLoading }
            >
              <span>Sign In</span>
            </LoadingButton>
          </Box>
        </Box>
        <Copyright sx={ { mt: 8, mb: 4 } }/>
      </Container> :
      <Navigate to={ localStorage.getItem("redirect_url") || '/' }/>
  );
}
