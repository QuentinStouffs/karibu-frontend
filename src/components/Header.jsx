import React from "react";
import "../stylesheets/header.scss";
import Navigation from "./Navigation";
function Header() {
    return (
        <header className="header">
            <div className="header__logo">
                <img src="/img/karibu.png" className="header__logo_image" alt="Karibu logo"/>
                <h1 className="header__logo_title">Karibu !</h1>
            </div>
            <Navigation/>
        </header>
    )
}

export default Header;