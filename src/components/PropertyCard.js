import React, {Component} from 'react'; 
import {Link} from 'react-router-dom';

class PropertyCard extends Component {
    
    render() {
        const data = this.props.data;
        return (
            
            <ul className={`property-list list-unstyled ${this.props.containerClass}`}>
                {data.map(place => 
                    <li className="property-card">
                        <div className="img-container">
                            <img src={`${place.images.primary}`} alt={`${place.name}`} />
                        </div>
                        <div className="row property-desc">
                            <h3>{place.name}</h3>
                            <p className="desc">{place.description}</p>
                        </div>
                        <div className="row city-row">
                            <p>
                                <img className="paper-plane-icon" src={process.env.PUBLIC_URL + '/paper-plane.svg'} />
                                {place.address.city}, {place.address.country}
                            </p>
                        </div>
                        <div className="row button-row">
                            <a className="link-button" href={`/place/${place.id}`}>
                                Detail
                            </a>
                        </div>
                    </li>
                )}
            </ul>
        )
    }
}

export default PropertyCard;