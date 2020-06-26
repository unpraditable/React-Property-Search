import React, {Component} from 'react'; 
import axios from 'axios';
import {Helmet} from "react-helmet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import PropertyCard from "../components/PropertyCard";
import SearchSelectProperty from "../components/SearchSelectProperty";

const Leaflet = window.L;

class PropertyList extends Component {

    state = {
        places: [],
        lat: -6.194925,
        lng: 106.723789,
        zoom: 15,
        isFirstPage: true,
        isLastPage: true,
        nextUrl: "",
        prevUrl: "",
        searchName : "",
        isDataEmpty : false,

        //arrayOfPositions must be set on default value, otherwise, the code won't work. This value is random value
        arrayOfPositions: [-9.852507, -15.351563],
    }

    componentDidMount() {
        var data = [];
        //execute this code to retrieve the data of offices or apartments in regards to the type of the place from the API
        axios.get(`https://api.npoint.io/e3f7aaeaf56696962f7b`)
        .then(res => {
            if(this.props.type === "apartment") {
                data = res.data.place.filter(place => place.type === "apartment");
            }
            if(this.props.type === "office") {
                data = res.data.place.filter(place => place.type === "office");
            }

            let offset = 0;

            //variables to parse query string from URL into a proper object
            const queryString = require('query-string');
            const parsedQueryString = queryString.parse(window.location.search);

            //searchName is the name parameter in the search query on URL
            const searchName = parsedQueryString.name;
            if(parsedQueryString.offset){
                offset = parseInt(parsedQueryString.offset);
            }

            //offset options config
            let nextOffset = offset + 4;
            let prevOffset = offset - 4;

            //handling prevOffset, so the prevOffset will not be out of bounds
            if(prevOffset < 0){
                prevOffset = 0;
            }

            //assign the nextUrl and prevUrl
            let nextUrl =`?offset=${nextOffset}`;
            let prevUrl = `?offset=${prevOffset}`;

            //function to search based on keywords
            if(searchName){
                data = data.filter(place=>place.name.toLowerCase().includes(searchName));

                //re-assign the nextUrl and prevUrl for the pagination if the search is not empty
                nextUrl = `?name=${searchName}&offset=${nextOffset}`
                prevUrl = `?name=${searchName}&offset=${prevOffset}`
            }

            if(offset !== 0){
                this.setState({ 
                    isFirstPage: false
                });
            } else {
                this.setState({ 
                    isFirstPage: true
                });
            }

            if(offset + 4 < data.length){
                this.setState({ 
                    isLastPage: false
                });
            } else {
                this.setState({ 
                    isLastPage: true
                });
            }

            data = data.slice(offset, offset+4);

            //set lat and long default value to a proper value
            var lat = -6.194925
            var long = 106.723789;

            if(data[0]){
                lat = data[0].address.latitude;
                long = data[0].address.longitude;
            }

            if(data <= 0){
                this.setState({
                    isDataEmpty: true
                })
            }

            //set array of position in purpose to fit all markers in one map
            let arrayOfPositions = []

            for(let i=0;i<data.length;i++) {
                let coordinateArray = [];
                coordinateArray.push(data[i].address.latitude, data[i].address.longitude)
                arrayOfPositions.push(coordinateArray)
            }

            //function to set state of places with data
            this.setState({ 
                places: data,
                lat: lat,
                lng: long,
                nextUrl: nextUrl,
                prevUrl: prevUrl,
                searchName: searchName,
                arrayOfPositions: arrayOfPositions,
            });
        })
    }
    render() {
        let places = this.state.places
        const position = [this.state.lat, this.state.lng];

        //set array of position in purpose to fit all markers in one map this code is copy-pasted from https://github.com/PaulLeCam/react-leaflet/issues/190, answered by nguyendh2601 
        const bounds = Leaflet.latLngBounds([this.state.arrayOfPositions]);
        return (
            
            <div className="property-list-container">
                <header className="header-home">
                {!this.state.searchName
                    ?   <Helmet>
                            <meta charSet="utf-8" />
                            <title>Situs Pencari Apartemen dan Kantor Terpercaya</title>
                        </Helmet>
                    :
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>Hasil pencarian {this.props.type} "{this.state.searchName}</title>
                    </Helmet>
                }
                {!this.state.searchName
                    ? <h1>Cari Apartemen & Kantor Impian Anda di Sini!</h1>
                    : <h1>Hasil pencarian {this.props.type} "{this.state.searchName}"</h1>
                }
                    <SearchSelectProperty />
                </header>
                {!this.state.isDataEmpty
                ?
                <div className="container-fluid">
                    <div className="grid-container-2 responsive">
                        <div className="grid-item">
                            <PropertyCard containerClass="grid-container-2 responsive"
                            type={`${this.props.type}`}
                            data={places}
                            />
                            <div className="pagination-container">
                                {!this.state.isFirstPage && 
                                    <a id="prev-button" href={this.state.prevUrl}>Previous</a>
                                }

                                {!this.state.isLastPage && 
                                    <a id="next-button" href={this.state.nextUrl}>Next</a>
                                }
                            </div>
                            
                        </div>
                        <div className="grid-item">
                            <Map center={position} zoom={this.state.zoom} ref={this.mapRef} bounds={bounds}>
                                <TileLayer
                                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                {places.map(marker =>
                                    <Marker 
                                        position={[marker.address.latitude, marker.address.longitude]}

                                        //show and unshow popup when hovered
                                        onMouseOver={(e) => {
                                            e.target.openPopup();
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.closePopup();
                                        }}

                                        //onclick di sini untuk navigate ke halaman detail ketika diklik. Onclick ini sebenarnya kurang bagus untuk SEO, kecuali jika di GTM ditanam sebuah code untuk tracking ke analitik
                                        onClick={() => window.location.href=`/place/${marker.id}`}
                                        
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
                :
                <h2 className="text-centered">Tidak ditemukan apartemen atau kantor</h2>
                }
                
            </div>
        )
    }
}

export default PropertyList;