import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

import '../stylesheets/artisan.scss';

const ShowArtisan = props => {
    
    if(!props.show) {
        return null;
    }
        const types = props.artisan.type.map(t => (
            <span>{t.name}</span>
        ))

    return (
        <div className="artisan__container">
            <FontAwesomeIcon onClick={props.handleClose} className='close' icon={faXmarkCircle}/>
            <h2>{props.artisan.name}</h2>
            <div>{props.artisan.address}</div>
            <div>{props.artisan.zipcode} {props.artisan.city}</div>
            <div><a href={"tel:" + props.artisan.phone}>{props.artisan.phone}</a></div>
            <div><a href={props.artisan.website}>{props.artisan.website}</a></div>
            <p>{types}</p>
        </div>
    )
}

export default ShowArtisan;