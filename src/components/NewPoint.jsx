import React, {useState, useEffect} from "react";
import axios from "axios";
import { API_URL } from "../constants";
import jwtDecode from "jwt-decode";
import Select from "react-select";
import PointForm from "./PointForm";
const NewPoint = props => {
    if(localStorage.getItem('access_token') === null){                   
        window.location.href = '/login'
    }

    return (
        <PointForm/>
    )
}

export default NewPoint;