import React, {Component} from 'react'; 
import {Helmet} from "react-helmet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
import PropertyCard from "../components/PropertyCard";
class PropertyList extends Component {
    state = {
        lat: -6.173498,
        lng: 106.728643,
        zoom: 17,
    }
    render() {
        const position = [this.state.lat, this.state.lng];

        return (
            <div className="property-list-container">
                <header className="header-home">
                    <h1>Cari Apartemen Impian Anda di Sini!</h1>
                </header>
                <div className="container-fluid">
                    <div className="grid-container-2">
                        <div className="grid-item">
                            <PropertyCard containerClass="grid-container-2"
                            type="apartment"
                            />
                            
                        </div>
                        <div className="grid-item">
                            <Map center={position} zoom={this.state.zoom}>
                                <TileLayer
                                    attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />

                                <Marker 
                                    position={position}
                                    onMouseOver={(e) => {
                                        e.target.openPopup();
                                    }}
                                    onMouseOut={(e) => {
                                        e.target.closePopup();
                                    }}
                                >
                                    <Popup>
                                        <strong>Apt A</strong><br></br>
                                        14, RT.14/RW.4, Rw. Buaya, Kecamatan Cengkareng, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11740
                                    </Popup>
                                </Marker>
                            
                            </Map>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default PropertyList;