import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../constants";

const Logout = () => {
    useEffect(()=> {
        (async()=>{
            try{
                const {data} = await axios.post(API_URL+"logout/", {
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