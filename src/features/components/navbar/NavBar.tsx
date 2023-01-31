import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useAppSelector } from "../../../redux/hooks";
import { selectAuth } from "../../login/loginSlice";
import Button from "@mui/material/Button";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import { persistor } from "../../../redux/store";


export default function NavBar() {
  const auth = useAppSelector(selectAuth);

  const [ anchorEl, setAnchorEl ] = React.useState<null | HTMLElement>(null);
  const onLogout = () => {
    void persistor.purge();
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
