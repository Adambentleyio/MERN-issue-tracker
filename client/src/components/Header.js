import React from "react";
import { NavLink } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";
import styled from "styled-components";


const Nav = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #022a52;
  a {
    color: #022a52;
    text-decoration: none;
    padding: 0 1rem;
  }
  a:hover {
    color: black;
  }
`;

const Header = () => {

  return (
    <div>
      <Nav>
        <div>
          <NavLink to="/">
            All Issues
          </NavLink>
          <NavLink to="/issue/new">
            Create Issue
          </NavLink>
        </div>
        <div className="right menu">
          <GoogleAuth />
        </div>
      </Nav>
    </div>
  );
};

export default Header;
