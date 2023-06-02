import { useState, useEffect } from "react";
import Modal from "./Modal";
import axios from "axios";
import NewUserForm from "./NewUserForm";
import { API_URL } from "../constants";
import jwtDecode from "jwt-decode";
import "../stylesheets/navigation.scss";

const Navigation = (props) => {
    const [showNewUser, setShowNewUser] = useState(false);
    const [showModifyUser, setShowModifyUser] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    const [user, setUser] = useState('')


    useEffect(() => {
        if (localStorage.getItem('access_token') !== null) {
           setIsAuth(true); 
           (async () => {
               try {
                    let token=jwtDecode(localStorage.getItem('access_token'))
                    const {data} = await axios.get(   
                                API_URL+'api/users/'+token.user_id+"/", {
                                    headers: {
                                    'Content-Type': 'application/json'
                                    }}
                                );
                    setUser(data)
                  } catch (e) {
                    console.log('not auth')
                  }
                 })()
         }
       }, [isAuth]);

       if (!props.show) {
        return null;
       }
    return (
        
        <div className="navigation__container">
               
                {isAuth ?  null : <a href="#" title="Création artisan" onClick={()=>setShowNewUser(true)}>Inscription</a> }
                {isAuth ?  <a href="#" title="Modifier profil" onClick={()=>setShowModifyUser(true)}>Modifier mon profil</a> : null}
                {isAuth ? null : <Modal title="Nouvel utilisateur" onClose={()=>setShowNewUser(false)} show={showNewUser}> 
                    <NewUserForm onClose={()=>setShowNewUser(false)} />  
                    </Modal> }
                {isAuth ? <Modal title="modifier utilisateur" onClose={()=>setShowModifyUser(false)} show={showModifyUser}> 
                    <NewUserForm user={user} onClose={()=>setShowModifyUser(false)} />  
                    </Modal> : null }
                {isAuth ? <a href="/mes-points-de-vente/">Mes points de vente</a> : null}
                {isAuth ?  <a href="/logout/" title="Connexion artisan">Logout</a> :<a href="/login/" title="Connexion artisan">Login artisan</a> }
            </div>
        
        
    )
}

export default Navigation;