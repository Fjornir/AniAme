import React from "react";
import logo from "../imgs/logo.png";
import { Link } from "react-router-dom";
import Search from "./search";

function Header() {
  return (
    <header className="header">
      <div className="content-width">
        <div className="header-wrapper">
          <Link to={"/AniAme"}>
            <img className="header__logo" src={logo} alt="" />
          </Link>
          <Link to={"/anime/search"}>
            <div>Аниме</div>
          </Link>
          <Search></Search>
        </div>
      </div>
    </header>
  );
}

export default Header;
