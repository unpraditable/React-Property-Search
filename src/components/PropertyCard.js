import React, {Component} from 'react'; 
import axios from 'axios';

class PropertyCard extends Component {
    state = {
        apartments: [],
        offices: [],
    }

    componentDidMount() {
        //execute this code to retrieve the data of offices and apartments from the API
        axios.get(`https://api.jsonbin.io/b/5ef42476e2ce6e3b2c793944`)
        .then(res => {
            const apartments = res.data.place.filter(place => place.type === "apartment");
            const offices = res.data.place.filter(place => place.type === "office")

            this.setState({ 
                apartments: apartments,
                offices: offices
            });
        })
    }
    render() {
        var data = [];
        if(this.props.type === "office") {
            data = this.state.offices
        }
        if(this.props.type === "apartment") {
            data = this.state.apartments
        }
        return (
            
            <ul className={`property-list list-unstyled ${this.props.containerClass}`}>
                {data.map(apartment => 
                    <li className="property-card">
                        <div className="img-container">
                            <img src={`${apartment.images.primary}`} alt={`${apartment.name}`} />
                        </div>
                        <div className="row property-desc">
                            <h3>{apartment.name}</h3>
                            <p className="desc">{apartment.description}</p>
                        </div>
                        <div className="row city-row">
                            <p>
                                <img className="paper-plane-icon" src={process.env.PUBLIC_URL + '/paper-plane.svg'} />
                                {apartment.address.city}, {apartment.address.country}
                            </p>
                        </div>
                        <div className="row button-row">
                            <a className="link-button" href="#">
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