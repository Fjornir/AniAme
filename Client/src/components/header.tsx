import React from "react";
import logo from "../imgs/logo.png";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="content-width">
        <Link to={"/"}>
          <img className="header__logo" src={logo} alt="" />
        </Link>
      </div>
    </header>
  );
}

export default Header;
