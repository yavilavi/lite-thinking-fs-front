import React from 'react';
import { Card, CardHeader, CircularProgress, LinearProgress } from "@mui/material";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { Outlet, } from "react-router-dom";
import { useAppSelector } from "./redux/hooks";
import { selectAuth } from "./features/login/loginSlice";
import NavBar from "./features/components/navbar/NavBar";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useLayoutContext } from "./context/layoutContext";
import { ToastContainer } from "react-toastify";
import AdminRequired from "./features/wrappers/AdminRequired";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const auth = useAppSelector(selectAuth);
  const { state: layoutData } = useLayoutContext();
  return (
    <>
      <ToastContainer
        autoClose={ 2000 }
        hideProgressBar={ false }
        newestOnTop={ false }
        closeOnClick
      />
      <CssBaseline/>
      { auth.isAuthenticated && <NavBar/> }
      <Card
        sx={ {
          flexGrow: 1,
        } }
      >
        <CardHeader
          action={
            layoutData.showPageHeaderAddAction ?
              <AdminRequired>
                <Button
                  variant="contained"
                  startIcon={ <AddIcon/> }
                  color="success"
                  onClick={ layoutData.pageHeaderAddAction }
                  sx={ {
                    mr: 9,
                  } }
                >
                  Add new { layoutData.pageHeaderAddActionBtnText }
                </Button>
              </AdminRequired> :
              null
          }
          title={ layoutData.pageTitle }
        />
        <Container
          maxWidth="xl"
          sx={ {
            flexGrow: 1,
            height: "90%",
          } }
        >
          <React.Suspense fallback={ <CircularProgress/> }>
            <Outlet/>
          </React.Suspense>
        </Container>
      </Card>
    </>
  )
    ;
}

export default App;



