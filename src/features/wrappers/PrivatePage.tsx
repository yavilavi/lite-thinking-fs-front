import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { selectAuth } from "../login/loginSlice";
import { useAppSelector } from "../../redux/hooks";

type PrivatePageProps = {
  children: JSX.Element;
}

const PrivatePage = (props: PrivatePageProps) => {
  const location = useLocation();
  localStorage.setItem('redirect_url', location.pathname);
  const auth = useAppSelector(selectAuth);
  if (!auth.isAuthenticated || !auth.userData || !localStorage.getItem("accessToken") || !auth.accessToken) {
    return <Navigate to="/login" replace/>
  }
  return props.children
}

export default PrivatePage
