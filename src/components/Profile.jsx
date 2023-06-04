import { useEffect, useState } from "react";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { API_URL } from "../constants";
import NewUserForm from "./NewUserForm";

import '../stylesheets/signin.scss';

const Profile = ()=> {
    const [user, setUser] = useState('')

    useEffect(() => {
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
       }, []);

    console.log(user)

    return (
        <div className="signin">
           { user && <NewUserForm user={user} />  }
        </div>
    )
}

export default Profile;