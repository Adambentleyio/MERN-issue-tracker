import React from "react";
import GoogleAuth from "./GoogleAuth";
import styled from "styled-components";
import {Link } from 'react-router-dom';


const Nav = styled.nav`
  background: #63d471;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #022a52;
`;

const NavLink = styled(Link)`
  color: #808080;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;
  &.active {
    color: #333333
  }
`

const NavMenu = styled.div`
  display: flex;
  align-items: center;

`

const Header = () => {

  return (
    <div>
      <Nav>
        <NavMenu>
        <div>
          <NavLink to="/">
            All Issues
          </NavLink>
          <NavLink to="/issue/new">
            Create Issue
          </NavLink>
        </div>
        <div >
          <GoogleAuth />
        </div>
        </NavMenu>
      </Nav>
    </div>
  );
};

export default Header;
