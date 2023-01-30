import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Copyright from "./components/CopyRght";
import { useAppDispatch } from "../../redux/hooks";
import { useNavigate } from "react-router-dom";
import { setAuthData, storeUserData } from "./loginSlice";
import { useLoginMutation, useGetUserDataMutation } from "../../services/AuthService";
import { useEffect } from "react";
import { IUserResponse } from "../../services/types";
import { LinearProgress } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [ login, { isLoading: loginLoading } ] = useLoginMutation();
  const [ getUserData, { isLoading: userLoading, isError, isSuccess } ] = useGetUserDataMutation();
  console.log( useGetUserDataMutation())
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const credentials = {
      email: data.get('email') as string,
      password: data.get('password') as string
    }
    const response = await login(credentials).unwrap();
    dispatch(setAuthData(response))
    const redirect_url = localStorage.getItem('redirect_url') ?? '/'
    navigate(redirect_url)
  };

  useEffect(() => {
    if (!!localStorage.getItem("accessToken") && !isError) {
      getUserData().then((data: { data: IUserResponse }) => {
        dispatch(storeUserData(data.data))
        const redirect_url = localStorage.getItem('redirect_url') ?? '/'
        // navigate(redirect_url)
      }).catch(console.error)
    }
  }, []);


  return (
    !userLoading ?
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
      <LinearProgress/>
  );
}
