import React, {useState, useEffect} from "react";
import axios from "axios";
import { API_URL } from "../constants";
import jwtDecode from "jwt-decode";
import Select from "react-select";
import PointForm from "./PointForm";
import { useParams } from "react-router-dom";
const ModifyPoint = props => {
    if(localStorage.getItem('access_token') === null){                   
        window.location.href = '/login'
    }
    const {id} = useParams();
    const [pdv, setPdv] = useState();

    useEffect(()=>{
        (async () => {
            try {
                let token=jwtDecode(localStorage.getItem('access_token'))
                const {data} = await axios.get(   
                                API_URL+'api/artisan/'+id+"/", {
                                headers: {
                                    'Content-Type': 'application/json'
                                }}
                            );
                            setPdv(data)
                            
                        } catch (e) {
                            console.log('not auth')
                        }
                    })()
                },[])
                    



    return (
        <div>
            {pdv ? <PointForm artisan={pdv}/> : <h1>Loading</h1>}
        </div>
    )
}

export default ModifyPoint;