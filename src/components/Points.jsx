import {useState, useEffect} from "react";
import axios from "axios";
import { API_URL } from "../constants";
import jwtDecode from "jwt-decode";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import '../stylesheets/points-list.scss';

const Points = () => {
    const [user, setUser] = useState('');
    const [points, setPoints] = useState([])

     useEffect(() => {
        if(localStorage.getItem('access_token') === null){                   
            window.location.href = '/login'
        }
        else{
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
        };
     }, []);

    useEffect(()=>{
        (async () => {
            try {
                 let token=jwtDecode(localStorage.getItem('access_token'))
                  const {data} = await axios.get(   
                                 API_URL+'api/artisanbyuser/'+token.user_id+"/", {
                                  headers: {
                                     'Content-Type': 'application/json'
                                  }}
                                );
                  setPoints(data)
               } catch (e) {
                 console.log('not auth')
               }
        })()
    }, [user])

    const deletePoint = id => {
        try {
            axios.delete(   
                        API_URL+'api/artisan/'+id+"/modify/", {
                        headers: {
                            'Content-Type': 'application/json'
                        }}
                    );
                    window.location.reload(false);
               } catch (e) {
                 console.log('not deleted', e)
               }
    }

    let tablecontent = points.map((point) => 
        <tr key={point.id}>
            <td>{point.name}</td>
            <td>{point.address + " - " + point.zipcode + " " + point.city}</td>
            <td>{point.type.map((type)=><span key={'type-'+type.id}>{type.name} </span>)}</td>
            <td>
                <Link to={`/modify/${point.id}`} className="actionBtn" ><FontAwesomeIcon icon={faPenToSquare} /></Link>
            
            <a href="#" className="actionBtn" onClick={() => deletePoint(point.id)} title="Supprimer"><FontAwesomeIcon icon={faTrash} /></a></td>
        </tr>
    );

    
    return (
        <div className="points-list">
            <a href="/new-artisan/" title="Créer un nouveau point de vente" className="points-list__new_button">Créer un nouveau point de vente</a>
            <table className="points-list__list">
                <thead>
                    <tr>
                        <td>Nom</td>
                        <td>Adresse</td>
                        <td>Types d'artisanat</td>
                        <td>Options</td>
                    </tr>
                </thead>
                <tbody>
                    {tablecontent}
                </tbody>
            </table>
        </div>
    )
}

export default Points;