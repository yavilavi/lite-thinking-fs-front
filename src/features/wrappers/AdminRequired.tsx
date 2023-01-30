import React, { PropsWithChildren } from "react";
import { useAppSelector } from "../../redux/hooks";
import { selectAuth } from "../login/loginSlice";

interface AdminRequiredProps extends PropsWithChildren {
  showError?: boolean;
}

export default function AdminRequired(props: AdminRequiredProps) {
  const auth = useAppSelector(selectAuth);
  return auth.isAuthenticated && auth.userData?.role === "ADMIN" ?
    <>{ props.children }</> :
    props.showError ? <span>You don't have enough permissions to access this resource</span> : null
    ;
}
