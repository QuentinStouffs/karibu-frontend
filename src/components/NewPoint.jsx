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