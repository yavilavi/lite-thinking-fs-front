import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography/Typography";
import { useNavigate, useLocation } from "react-router-dom";

export default function DesktopMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const pages = [ 'company', "stock" ];
  const handleClick = (route: string) => {
    navigate(`/${ route }`);
  }
  return (
    <>
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={ {
          mr: 2,
          display: { xs: 'none', md: 'flex' },
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        } }
      >
        <img
          src="https://dnebzvlr0lrrh.cloudfront.net/lite-thinking/Logo_Lite_Thinking_Sin_Fondo_1.png"
          style={{
            maxWidth: "50px"
          }}
        />
      </Typography>
      <Box sx={ { flexGrow: 1, display: { xs: 'none', md: 'flex' } } }>
        { pages.map((page) => (
          <Button
            variant={ (location.pathname.replace('/', '') === page) ? "outlined" : "contained" }
            color={ (location.pathname.replace('/', '') === page) ? "success" : undefined }
            key={ page }
            onClick={ (location.pathname.replace('/', '') === page) ? () => {
            } : () => handleClick(page) }
            sx={ { my: 2, ml:3,  color: 'white', display: 'block' } }
          >
            { page }
          </Button>

        )) }
      </Box>
    </>

  )
}
