import { useEffect} from "react";
import axios from "axios";
import { API_URL } from "../constants";

const Logout = () => {
    useEffect(()=> {
        (async()=>{
            try{
                await axios.post(API_URL+"/api/logout/", {
                    refresh_token: localStorage.getItem('refresh_token')
                    }, {headers: {'Content-Type': 'application/json'}},
                    {withCredentials: true});
            localStorage.clear();
            axios.defaults.headers.common['Authorization'] = null;
            window.location.href = '/'
            } catch(e) {
                console.log('logout not working', e)
            }
        })();
    }, []);

    return (
        <div></div>
    )
}

export default Logout;