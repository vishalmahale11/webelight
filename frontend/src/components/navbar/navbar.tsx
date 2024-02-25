import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { MdHistory } from "react-icons/md";
import { FaShoppingCart, FaHome } from "react-icons/fa";
import { useAppSelector } from "../../Redux/store";

const Navbar: React.FC = () => {
  const { cartData } = useAppSelector((store) => store.cartSlice);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          My App
        </Typography>
        <Button color="inherit" component={Link} to="/">
          <FaHome size={30} />
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          <FaShoppingCart size={30} />
        </Button>
        <Button color="inherit" component={Link} to="/order-history">
          <MdHistory size={30} />
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
