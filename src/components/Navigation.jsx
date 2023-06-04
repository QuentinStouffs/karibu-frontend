import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../stylesheets/navigation.scss";

const Navigation = (props) => {
    const [isAuth, setIsAuth] = useState(false);


    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
           setIsAuth(true); 
         }
       }, [isAuth]);

       if (!props.show) {
        return null;
       }
    return (
        
        <div className="navigation__container">
               
                {isAuth ?  null : <Link to={`/signin`}>Inscription</Link>}
                {isAuth ? <a href="/profile">Modifier mon profil</a>: null }
                {isAuth ? <a href="/mes-points-de-vente/">Mes points de vente</a> : null}
                {isAuth ?  <a href="/logout/" title="déconnexion">Logout</a> :<a href="/login/" title="Connexion artisan">Login artisan</a> }
            </div>
        
        
    )
}

export default Navigation;