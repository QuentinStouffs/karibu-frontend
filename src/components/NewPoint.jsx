import PointForm from "./PointForm";

import '../stylesheets/point.scss';
const NewPoint = props => {
    if(localStorage.getItem('access_token') === null){                   
        window.location.href = '/login'
    }

    return (
        <div className="point">
            <PointForm/>
        </div>
    )
}

export default NewPoint;