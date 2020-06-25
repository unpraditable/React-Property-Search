import React, {Component} from 'react'; 
import axios from 'axios';
import {Helmet} from "react-helmet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import PropertyCard from "../components/PropertyCard";
class PropertyList extends Component {

    state = {
        places: [],
        lat: -6.173498,
        lng: 106.728643,
        zoom: 17,
    }

    componentDidMount() {
        var data = [];
        //execute this code to retrieve the data of offices or apartments in regards to the type of the place from the API
        axios.get(`https://api.jsonbin.io/b/5ef42476e2ce6e3b2c793944`)
        .then(res => {
            if(this.props.type === "apartment") {
                data = res.data.place.filter(place => place.type === "apartment");
            }
            if(this.props.type === "office") {
                data = res.data.place.filter(place => place.type === "office");
            }

            //function to set state of places with data
            this.setState({ 
                places: data
            });
        })
    }
    render() {
        let places = this.state.places
        const position = [this.state.lat, this.state.lng];

        //variables to parse query string from URL into a proper object
        const queryString = require('query-string');
        const parsedQueryString = queryString.parse(window.location.search);

        //searchName is the name parameter in the search query on URL
        const searchTitle = parsedQueryString.name;

        //function to search based on keywords
        places = places.filter(place=>place.name.toLowerCase().includes(searchTitle))

        

        return (
            <div className="property-list-container">
                <header className="header-home">
                    <h1>Cari Apartemen Impian Anda di Sini!</h1>
                </header>
                <div className="container-fluid">
                    <div className="grid-container-2">
                        <div className="grid-item">
                            <PropertyCard containerClass="grid-container-2"
                            type={`${this.props.type}`}
                            data={places}
                            searchName=""
                            />
                            
                        </div>
                        <div className="grid-item">
                            <Map center={position} zoom={this.state.zoom} >
                                <TileLayer
                                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                {places.map(marker =>
                                    <Marker 
                                        position={[marker.address.latitude, marker.address.longitude]}
                                        onMouseOver={(e) => {
                                            e.target.openPopup();
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.closePopup();
                                        }}
                                        
                                    >
                                        <Popup>
                                            <strong>{marker.name}</strong><br></br>
                                            {marker.address.street}
                                        </Popup>
                                    </Marker>
                                )}
                            </Map>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default PropertyList;