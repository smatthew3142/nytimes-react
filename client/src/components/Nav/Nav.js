import React from "react";
import { Navbar, NavItem } from "react-materialize";


const Nav = () => (

  <Navbar brand='New York Times News Search' href="/"  right style={{position: 'fixed'}}>
  <NavItem href='/'>Home</NavItem>
  <NavItem href='/savedArticles'>Saved Articles</NavItem>
</Navbar>
);

export default Nav;
