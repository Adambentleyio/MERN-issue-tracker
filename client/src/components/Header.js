import React from "react";
import { Link } from "react-router-dom";
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
          <Link className="item" to="/">
            All Issues
          </Link>
          <Link className="item" to="/issue/new">
            Create Issue
          </Link>
          {/* <Link className="item" to="/express">
            Express Test
          </Link> */}
        </div>
        <div className="right menu">
          <GoogleAuth />
        </div>
      </Nav>
    </div>
  );
};

export default Header;
