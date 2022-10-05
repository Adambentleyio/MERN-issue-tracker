import React from "react";
import GoogleAuth from "./GoogleAuth";
import styled from "styled-components";
import {Link } from 'react-router-dom';



const Nav = styled.nav`
  background: #121111;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #212121;
  `

const NavLink = styled(Link)`
  color: #808080;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;
  &.active {
    color: #333333
  }
`

const NavMenu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  @media (max-width: 320px) {
    flex-direction: column;
    margin: 0 auto;
  }
`

const Header = () => {

  return (
    <div>
      <Nav>
        <NavMenu>
        <div>
          <NavLink to="/">
            All
          </NavLink>
          <NavLink to="/issue/new">
            New
          </NavLink>
        </div>
        <div>
          <GoogleAuth />
        </div>
        </NavMenu>
      </Nav>
    </div>
  );
};

export default Header;
