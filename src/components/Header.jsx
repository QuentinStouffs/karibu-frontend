import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";

import "../stylesheets/header.scss";

function Header() {
    const [showNav, setShowNav] = useState(false);
    const handleMenu = () => {
        showNav ? setShowNav(false) : setShowNav(true);
    }
    return (
        <header className="header">
            <Link to={`/`} className="header__logo">
                <img src="/img/karibu.png" className="header__logo_image" alt="Karibu logo"/>
                <h1 className="header__logo_title">Karibu !</h1>
            </Link>
            <div className="header__menu_container">
                <FontAwesomeIcon className="header__menu_icon" icon={faBars} onClick={handleMenu}/>
                <Navigation show={showNav}/>
            </div>
        </header>
    )
}

export default Header;