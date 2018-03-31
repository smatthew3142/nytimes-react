import React from "react";
import { Navbar, NavItem } from "react-materialize";
import "./Nav.css";


const Nav = () => (

  <Navbar className= "nav  grey darken-1" right style={{position: 'fixed', zIndex: 10}}>
  <a href="/" className="brand-logo center">The New York Times Article Search</a>
  <NavItem href='/'>Home</NavItem>
  <NavItem href='#savedArticleCard'>Saved Articles</NavItem>
</Navbar>
);

export default Nav;
