import React, {useState, useEffect} from "react";
import axios from "axios";
import { API_URL } from "../constants";
import jwtDecode from "jwt-decode";
import Select from "react-select";
const PointForm = props => {
    const [types, setTypes] = useState([])
    
    useEffect(()=>{
        let token=jwtDecode(localStorage.getItem('access_token'))
        setArtisan({...artisan, user : token.user_id})
        if(props.artisan){
            const { id, name, user, address, phone, website, zipcode, city,types } = props.artisan;
            setArtisan({ id, name, user, address, phone, website, zipcode, city,types });
        }

        (async () => {
            try {
                  const {data} = await axios.get(   
                                 API_URL+'api/artisan/types/', {
                                  headers: {
                                     'Content-Type': 'application/json'
                                  }}
                                );
                  setTypes( data)
                } catch (e) {
                    console.log('not auth')
                }
            })()
            
    }, []);

    

    const initialArtisan = {
        id: 0,
        name: "",
        user: "",
        address: "",
        phone: "",
        website: "",
        zipcode: "",
        city: "",
        types: []
    }

    const initialerror = {
        name: "",
        address: "",
        phone: "",
        website: "",
        zipcode: "",
        city: "",
        types: "",
        isError:false
    }

    const [ artisan, setArtisan ] = useState(initialArtisan);
    const [ error, setError ] = useState(initialerror);
    const [selectedTypes, setSelectedTypes] = useState([])
    
    const onSelectChange = newValue => {
        let val = newValue.map( item => item.id)
        setArtisan(artisan => ({...artisan, types: val}))
    }
    
    useEffect(()=>{
        console.log(artisan)
    }, [artisan])
    const createArtisan = e => {
        e.preventDefault();
        sendArtisan()
    }

    const sendArtisan = () => {
        if (error.isError==false){
            axios.post(API_URL+'api/artisan/', artisan)
                .then(() => {
                    setArtisan(initialArtisan);
                    window.location.href='/mes-points-de-vente/'
                })
        }else{
            return null;
        }
    }

    const onChange = e => {
        setArtisan(artisan=> ({...artisan, [e.target.name]: e.target.value }))
    }
    

    const editArtisan = e => {
        e.preventDefault();
        axios.put(API_URL + "api/artisan/"+artisan.id+"/", artisan)
                .then(()=>{
                    setArtisan(initialArtisan)
                    props.onClose()
                });
    }
    

    const validate = e => {
        setError(initialerror);

        if( !artisan.name ) {
            setError({ name : "Veuillez entrer un nom", isError: true})  
        }
        else if( !artisan.address ) {
            setError({ address : "Veuillez entrer une adresse", isError: true})
        }
        else if( !artisan.zipcode ) {
            setError({ zipcode : "Veuillez entrer un code postal", isError: true})
        }
        else if( !artisan.city ) {
            setError({ city : "Veuillez entrer une ville", isError: true})
        }
        else if( !artisan.phone ) {
            setError({ phone : "Veuillez entrer un téléphone", isError: true})
        }
        else if( !artisan.website ) {
            setError({ website : "Veuillez entrer un site web", isError: true})
        }else if(selectedTypes.length === 0){
            setError({ types : "Veuillez choisir au moins un type", isError: true})
        }

    }
    
    return (
        <form onSubmit={props.artisan ? editArtisan : createArtisan}>
            <fieldset>
                <label htmlFor="name">Nom du point de vente</label>
                <input type="text" name="name" onChange={e => {onChange(e); validate(e);}} value={artisan.name!="" ? artisan.name : ""}></input>
                {error.name && <span className='err'>{error.name}</span>}
            </fieldset> 
            <fieldset>
                <label htmlFor="address">Adresse</label>
                <input type="text" name="address" onChange={e => {onChange(e); validate(e);}} value={artisan.address!="" ? artisan.address : ""}></input>
                {error.address && <span className='err'>{error.address}</span>}
            </fieldset> 
            <fieldset>
                <label htmlFor="zipcode">Code postal</label>
                <input type="text" name="zipcode" onChange={e => {onChange(e); validate(e);}} value={artisan.zipcode!="" ? artisan.zipcode : ""}></input>
                {error.zipcode && <span className='err'>{error.zipcode}</span>}
            </fieldset> 
            <fieldset>
                <label htmlFor="city">Ville</label>
                <input type="text" name="city" onChange={e => {onChange(e); validate(e);}} value={artisan.city!="" ? artisan.city : ""}></input>
                {error.city && <span className='err'>{error.city}</span>}
            </fieldset> 
            <fieldset>
                <label htmlFor="phone">Téléphone</label>
                <input type="text" name="phone" onChange={e => {onChange(e); validate(e);}} value={artisan.phone!="" ? artisan.phone : ""}></input>
                {error.phone && <span className='err'>{error.phone}</span>}
            </fieldset> 
            <fieldset>
                <label htmlFor="website">Site web</label>
                <input type="text" name="website" onChange={e => {onChange(e); validate(e);}} value={artisan.website!="" ? artisan.website : ""}></input>
                {error.website && <span className='err'>{error.website}</span>}
            </fieldset> 
            <fieldset id="type">
                <label htmlFor="types">Types d'artisan</label>
                <Select onChange={e => {onSelectChange(e); validate(e);}} onBlur={validate} isMulti name="types" className="basic-multi-select" classNamePrefix="select" options={types} getOptionLabel={option => option.name} getOptionValue={option => option.id}/>
                {error.types && <span className='err'>{error.types}</span>}
            </fieldset> 
            <button type="submit">envoyer</button>
        </form>
    )
    
}

export default PointForm;