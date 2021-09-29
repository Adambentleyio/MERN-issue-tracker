import React from "react";
import { Link } from "react-router-dom";
import GoogleAuth from "./GoogleAuth";

const Header = () => {
  return (
    <div>
      <div
        style={{ padding: "20px 0 20px 0" }}
        className="ui secondary stackable menu pointing"
      >
        <Link className="item" to="/">
          All Issues
        </Link>
        <Link className="item" to="/issue/new">
          Create Issue
        </Link>
        <Link className="item" to="/express">
          <div style={{ color: "teal" }}>Express Test</div>
        </Link>
        <div className="right menu">
          <GoogleAuth />
        </div>
      </div>
    </div>
  );
};

export default Header;
