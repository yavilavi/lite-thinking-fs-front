import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { logout, selectAuth } from "../../login/loginSlice";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";


export default function NavBar() {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const [ anchorEl, setAnchorEl ] = React.useState<null | HTMLElement>(null);
  const onLogout = () => {
    dispatch(logout());
  }

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <AppBar position="static" enableColorOnDark>
        <Toolbar
          sx={ {
            display: "flex",
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between"
          } }
        >
          <MobileMenu handleMenu={ handleMenu } anchorEl={ anchorEl } handleClose={ handleClose }/>
          <DesktopMenu />
          <Box sx={ {
            display: "flex"
          } }>
            <Typography
              variant="h6" component="div"
              sx={ {
                padding: "6px 8px",
                display: "flex",
                alignItems: "center",
                flexGrow: 1,
                fontSize: "0.875rem"
              } }
            >
              { auth.userData?.name }
            </Typography>
            <Button
              variant="contained"
              color="error"
              onClick={ onLogout }
            >
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
