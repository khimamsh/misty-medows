import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { setSessionToken } from "../../../utils/utils";
import { useNavigate } from "react-router-dom";

const TopBar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate= useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOnClick=(action:string)=>{
   if(action==='logout') 
   {
    setSessionToken('');
    navigate('/')
    }
   

  };
  return (
    <AppBar position="sticky">
      <Toolbar style={{ justifyContent: "space-between" }}>
          <Typography style={{fontSize:"20px"}}>EXAM | VAAVE</Typography>
          <IconButton color="inherit" edge="end" onClick={handleMenuOpen}>
            <MoreVertIcon />
          </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={()=>handleOnClick('logout')}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;
