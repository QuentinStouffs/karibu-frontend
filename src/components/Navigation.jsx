import { useState, useEffect } from "react";
import Modal from "./Modal";
import NewUserForm from "./NewUserForm";

function Navigation() {
    const [showNewUser, setShowNewUser] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
           setIsAuth(true); 
         }
       }, [isAuth]);

    return (
        <div className="navigation__container">
            
            {isAuth ?  <a href="/logout/" title="Connexion artisan">Logout</a> :<a href="/login/" title="Connexion artisan">Login artisan</a> }
            {isAuth ?  null : <a href="#" title="Création artisan" onClick={()=>setShowNewUser(true)}>Inscription</a> }
            {isAuth ? null : <Modal title="Nouvel utilisateur" onClose={()=>setShowNewUser(false)} show={showNewUser}> 
                <NewUserForm onClose={()=>setShowNewUser(false)} />  
                </Modal> }
        </div>
    )
}

export default Navigation;