import React, {Component} from 'react'; 
import axios from 'axios';
import {Helmet} from "react-helmet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import PropertyCard from "../components/PropertyCard";
import SearchSelectProperty from "../components/SearchSelectProperty";

class PropertyList extends Component {

    state = {
        places: [],
        lat: -6.194925,
        lng: 106.723789,
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

            var offset = 0;

            //variables to parse query string from URL into a proper object
            const queryString = require('query-string');
            const parsedQueryString = queryString.parse(window.location.search);

            //searchName is the name parameter in the search query on URL
            const searchTitle = parsedQueryString.name;
            if(parsedQueryString.offset){
                offset = parseInt(parsedQueryString.offset);
            }

            //function to search based on keywords
            if(searchTitle){
                data = data.filter(place=>place.name.toLowerCase().includes(searchTitle))
            }

            data = data.slice(offset, offset+4);

            //set lat and long default value to a proper value
            var lat = -6.194925
            var long = 106.723789;

            if(data[0]){
                lat = data[0].address.latitude;
                long = data[0].address.longitude;
            }

            //function to set state of places with data
            this.setState({ 
                places: data,
                lat: lat,
                lng: long
            });
        })
    }
    render() {
        let places = this.state.places
        const firstPlace = Object.keys(places)[0];
        const position = [this.state.lat, this.state.lng];

        return (
            <div className="property-list-container">
                <header className="header-home">
                    
                    <h1>Cari Apartemen Impian Anda di Sini!</h1>
                    <SearchSelectProperty />
                </header>
                <div className="container-fluid">
                    <div className="grid-container-2">
                        <div className="grid-item">
                            <PropertyCard containerClass="grid-container-2"
                            type={`${this.props.type}`}
                            data={places}
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