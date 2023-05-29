const ShowArtisan = props => {
    console.log(props.artisan)
    
        const types = props.artisan.type.map(t => (
            <span>{t.name}</span>
        ))

    return (
        <div>
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