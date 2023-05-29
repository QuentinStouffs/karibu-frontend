import {useState, useEffect} from "react";
import axios from "axios";
import { API_URL } from "../constants";
import jwtDecode from "jwt-decode";

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
                        API_URL+'api/artisan/'+id+"/", {
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
            <td><a href="#" title="modifier">Modifier</a><a href="#" onClick={() => deletePoint(point.id)} title="Supprimer">Supprimer</a></td>
        </tr>
    );

    
    return (
        <div>
            <a href="/new-artisan/" title="Créer un nouveau point de vente">Créer un nouveau point de vente</a>
            <table>
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