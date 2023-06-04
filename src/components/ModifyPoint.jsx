import React, {useState, useEffect} from "react";
import axios from "axios";
import { API_URL } from "../constants";
import PointForm from "./PointForm";
import { useParams } from "react-router-dom";

import '../stylesheets/point.scss';

const ModifyPoint = props => {
    if(localStorage.getItem('access_token') === null){                   
        window.location.href = '/login'
    }
    const [pdv, setPdv] = useState();
    const {id} = useParams();
    
    useEffect(()=>{
        (async () => {
            try {
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
                },[id])
                    



    return (
        <div className="point">
            {pdv ? <PointForm artisan={pdv}/> : <h1>Loading</h1>}
        </div>
    )
}

export default ModifyPoint;