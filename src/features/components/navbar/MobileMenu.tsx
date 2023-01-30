import { IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { MouseEvent } from "react";

interface MobileMenuProps {
  handleMenu: (event: MouseEvent<HTMLElement>) => void
  anchorEl: null | HTMLElement
  handleClose: () => void;
}

export default function MobileMenu(props: MobileMenuProps) {
  const { handleClose, handleMenu, anchorEl } = props
  const navigate = useNavigate();
  return (
    <Box sx={ { flexGrow: 1, display: { xs: 'flex', md: 'none' } } }>
      <IconButton
        size="large"
        aria-label="menu"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={ handleMenu }
        color="inherit"
      >
        <MenuIcon/>
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={ anchorEl }
        anchorOrigin={ {
          vertical: 'top',
          horizontal: 'right',
        } }
        keepMounted
        transformOrigin={ {
          vertical: 'top',
          horizontal: 'right',
        } }
        open={ Boolean(anchorEl) }
        onClose={ handleClose }
      >
        <MenuItem
          onClick={ () => {
            handleClose();
            navigate('/company')
          } }
        >
          Company
        </MenuItem>
        <MenuItem
          onClick={ () => {
            handleClose();
            navigate('/stock')
          } }
        >
          stock
        </MenuItem>
      </Menu>
    </Box>
  )
}
