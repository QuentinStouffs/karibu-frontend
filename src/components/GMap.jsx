import { GoogleMap, Marker, useLoadScript, Autocomplete } from "@react-google-maps/api";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API_URL, GMAPS_DARK_STYLE } from "../constants";
import ShowArtisan from "./ShowArtisan";

import '../stylesheets/gmap.scss'

const placesLibrary = ['places']

const GMap = () => {
    const [searchResult, setSearchResult]=useState('');
    const [artisans, setArtisans]= useState([])
    const [markers, setMarkers]= useState([])
    const [selectedMarker, setSelectedMarker] = useState(null)
    const [geometry, setGeometry] = useState({lat: 50.8476424, lng: 4.3571696})
    
    const radiusRef = useRef()

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'GOOGLE_MAPS_API_KEY',
        libraries: placesLibrary
    });


    useEffect(()=> {
        getArtisans()
    },[geometry])
    
    const handleMarkerClick = (artisan) => {
        setSelectedMarker(artisan)
    }

    useEffect(()=> {
        setMarkers(artisans.map((artisan) => (
            
            <Marker key={artisan.id}
                position={{ lat: Number(artisan.latitude), lng: Number(artisan.longitude)}}
                icon={"http://maps.google.com/mapfiles/ms/icons/green-dot.png"}
                onClick={()=>{
                    handleMarkerClick(artisan)
                }}
            />
            
        )))
    },[artisans])

    function onPlaceChanged() {
        
        if (searchResult != null && typeof searchResult.getPlace === "function") {
          //variable to store the result
          const place = searchResult.getPlace();
          //variable to store the formatted address from place details result
          const formattedAddress = place.formatted_address;
          getGeometry(formattedAddress)
          
        } else {
            onPlaceChanged()
        }
      }

const getGeometry = (address) => {

    (async () => {
        try {
             const params = new URLSearchParams([["address", address]])
              const {data} = await axios.get(   
                             API_URL+'api/geometry/', {params}
                            )
                setGeometry(data)
           } catch (e) {
             console.log('not auth')
           }
    })()
}

const getArtisans = () => {
    (async () => {
        try {
              const {data} = await axios.get(   
                             API_URL+'api/artisansearch/'+geometry.lat+'/'+geometry.lng+'/'+radiusRef.current.value+'/')
                setArtisans(data)
           } catch (e) {
             console.log('not auth')
           }
    })()
}

    function onLoad(autocomplete) {
        setSearchResult(autocomplete);
      }

    return (
        <div>
            {!isLoaded ? (
                <h1>Loading....</h1>
            ) : (
                <div>
                    <div className="home__inputs">
                        
                        <Autocomplete
                            onPlaceChanged={onPlaceChanged}
                            onLoad={onLoad}
                            restrictions={{country: 'BE'}}
                            >

                        <input className="home__input"
                            type="text"
                            placeholder="Entrez une adresse"
                            style={{
                                boxSizing: `border-box`,
                                border: `1px solid transparent`,
                                width: `240px`,
                                height: `32px`,
                                padding: `0 12px`,
                                borderRadius: `3px`,
                                boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                                fontSize: `14px`,
                                outline: `none`,
                                textOverflow: `ellipses`,
                            }}
                        />

                    </Autocomplete>
                        <select className={"radius"} ref={radiusRef} >
                            <option value='5000'>5Km </option>
                            <option selected value='10000'>10Km </option>
                            <option value='15000'>15Km </option>
                            <option value='20000'>20Km </option>
                        </select>
                    </div>
                
                    <GoogleMap 
                        mapContainerClassName="map-container"
                        center={geometry}
                        zoom={12}
                        options={{styles: GMAPS_DARK_STYLE, 
                            mapTypeControl: false,
                            streetViewControl: false,
                            rotateControl: false,
                            fullscreenControl: false}}
                    >
                        {markers}
                    </GoogleMap>

                </div>
            )
        }
        
        {selectedMarker && <ShowArtisan show={selectedMarker ? true : false} handleClose={()=>setSelectedMarker(false)} artisan={selectedMarker} /> }

        </div>
    )
}

export default GMap;
