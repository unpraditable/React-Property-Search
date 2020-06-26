import React, {Component} from 'react'; 
import {Helmet} from "react-helmet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import axios from 'axios';

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";


class PropertyDetail extends Component {
    state = {
        place: [],
        zoom: 16,
    }

    
    componentDidMount() {
        const placeSlug = this.props.match.params.propertyId;

        //execute this code to retrieve the data of offices and apartments from the API
        axios.get(`https://api.jsonbin.io/b/5ef42476e2ce6e3b2c793944`)
        .then(res => {
            //sebenarnya, untuk ini seharusnya menggunakan find karena hanya butuh satu object saja, tapi karena terus menemuii error ketika hendak print nilai nested object, maka jadi pakai cara filter
            let places = res.data.place.filter(place => place.id === parseInt(placeSlug));

            this.setState({ 
                place: places,
            });
        })

    }
    render() {

        var data = this.state.place[0];

        let slickSettings = {
            dots: false,
            auto: false,
            arrows: true,
            infinite: true,
            speed: 500,
            adaptiveHeight: true,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 1.25,
                    arrows: false,
                  }
                }
              ]
        };

        return (
            <div>
                {this.state.place.map(place =>
                <div 
                    className="main-banner" 
                    style={{ backgroundImage: `url(${place.images.primary})` }}
                ></div>
                )}
                                    
                <div className="container">

                    {this.state.place.map(place => 
                        <h1>{place.name}</h1> 
                    )}

                    {this.state.place.map(place => 

                        <div className="grid-container-2 responsive">
                        <div className="grid-item">
                            <div className="row">
                                <h3>Description</h3>
                                <article>
                                    {place.description}
                                </article>
                            </div>
                            <div className="row">
                                <h3>Facilities</h3>
                                <ul className="list-unstyled facilities-list">
                                    {place.facilities.map(facility =>
                                        <li>{facility}</li>
                                    ) 
                                    }
                                </ul>
                            </div>
                            
                        </div>
                        <div className="grid-item">
                            <div className="row">
                                <h3>Location</h3>
                                <p>
                                    {place.address.street}
                                </p>
                                <Map center={[place.address.latitude, place.address.longitude]} zoom={this.state.zoom}>
                                    
                                    <TileLayer
                                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                    />

                                    <Marker 
                                        position={[place.address.latitude, place.address.longitude]}
                                        onMouseOver={(e) => {
                                            e.target.openPopup();
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.closePopup();
                                        }}
                                    >
                                        <Popup>
                                            <strong>{place.name}</strong><br></br>
                                            {place.address.street}
                                        </Popup>
                                    </Marker>
                                
                                </Map>
                            </div>
                        </div>
                    </div>
                    )}


                    {this.state.place.map(place =>
                        <div className="slider-wrapper">
                            <h2>Images</h2>
                            <Slider {...slickSettings}>
                                {place.images.others.map(image =>
                                    <div>
                                        <img src={`${image}`} alt={`${place.name} - Photo`} />
                                    </div>
                                )}
                            </Slider>
                        </div>                            
                    )}              
                </div>
            </div>
            
        )
    }
}

export default PropertyDetail;