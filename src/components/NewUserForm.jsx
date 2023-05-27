import React, { useEffect, useState } from "react";

import axios from "axios";

import { API_URL } from "../constants";

const NewUserForm = props => {
    

    const initialState = {
        id: 0,
        username: "", 
        last_name: "", 
        password: "",
        name: "", 
        first_name: "", 
        email: "",
        confirmpassword: ""
    }

    const errorInitialState={
        username: "", 
        last_name: "", 
        password: "",
        name: "", 
        first_name: "", 
        email: "",
        isError: false
    }

    const [ user, setUser] = useState(initialState)
    const [ error, setError ] = useState(errorInitialState)

    

    const validate = e => {
        setError(errorInitialState);

        if( !user.username ) {
            setError({ username : "Veuillez entrer un nom d'utilisateur", isError: true})  
        }
        else if( !user.last_name ) {
            setError({ last_name : "Veuillez entrer un nom", isError: true})
        }
        else if( !user.first_name ) {
            setError({ first_name : "Veuillez entrer un prénom", isError: true})
        }
        else if( !user.name ) {
            setError({ name : "Veuillez entrer un nom d'entreprise", isError: true})
        }
        else if( !user.email ) {
            setError({ email : "Veuillez entrer un email", isError: true})
        }
        else if( !user.email.includes('@') ) {
            setError({ email : "Veuillez entrer un email valide", isError: true})
        }
        else if( !user.password ) {
            setError({ password : "Veuillez entrer un password", isError: true})
        }
        else if( user.password !== user.confirmpassword ) {
            setError({ password : "La vérification du password ne correspond pas", isError: true})
        }

    }

    useEffect(()=>{
        if(props.user){
            const { id, username, last_name, password, name, first_name, email } = props.user
            setUser({id, username, last_name, password, name, first_name, email})
        }
    })

    const createUser = e => {
        e.preventDefault();
        if(error.isError === false) {
            axios.post(API_URL+"api/users/", user)
            .then(()=> {
                setUser(initialState)
                props.onClose()
            })
        } else {
            return null;
        }
        
    }
    const onChange = e => {
        setUser(user => ({ ...user, [e.target.name]: e.target.value }))
    }



    const editUser = e => {
        e.preventDefault();
        axios.post(API_URL+"api/users/", user)
            .then(()=> {
                setUser(initialState)
                props.onClose()
            })
    }

    return (
        <form id="formUser" onSubmit={props.user ? editUser : createUser}>
           <fieldset>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" onChange={e => {onChange(e); validate(e);}} value={user.username!="" ? user.username : ""}></input>
                {error.username && <span className='err'>{error.username}</span>}
            </fieldset> 
           <fieldset>
                <label htmlFor="last_name">Last_name</label>
                <input type="text" name="last_name" onChange={e => {onChange(e); validate(e);}} value={user.last_name!="" ? user.last_name : ""}></input>
                {error.last_name && <span className='err'>{error.last_name}</span>}
            </fieldset> 
           <fieldset>
                <label htmlFor="first_name">First name</label>
                <input type="text" name="first_name" onChange={e => {onChange(e); validate(e);}} value={user.first_name!="" ? user.first_name : ""}></input>
                {error.first_name && <span className='err'>{error.first_name}</span>}
            </fieldset>
           <fieldset>
                <label htmlFor="name">Nom de l'entreprise</label>
                <input type="text" name="name" onChange={e => {onChange(e); validate(e);}} value={user.name!="" ? user.name : ""}></input>
                {error.name && <span className='err'>{error.name}</span>}
            </fieldset>
           <fieldset>
                <label htmlFor="email">eMail</label>
                <input type="email" name="email" onChange={e => {onChange(e); validate(e);}} value={user.email!="" ? user.email : ""}></input>
                {error.email && <span className='err'>{error.email}</span>}
            </fieldset>
           <fieldset>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" onChange={e => {onChange(e); validate(e);}} value={user.password!="" ? user.password : ""}></input>
                {error.password && <span className='err'>{error.password}</span>}
            </fieldset>
           <fieldset>
                <label htmlFor="confirmpassword">Confirmez le Password</label>
                <input type="password" name="confirmpassword" onChange={e => {validate(e); onChange(e); }} onBlur={validate} ></input>
            </fieldset>
            <button type="submit">Envoyer</button>
        </form>
    )


}

export default NewUserForm