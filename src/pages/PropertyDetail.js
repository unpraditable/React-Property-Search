import React, {Component} from 'react'; 
import {Helmet} from "react-helmet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
class PropertyDetail extends Component {
    state = {
        lat: -6.173498,
        lng: 106.728643,
        zoom: 17,
    }
    render() {
        const position = [this.state.lat, this.state.lng];

        return (
            <div>
                <div 
                    className="main-banner" 
                    style={{ backgroundImage: `url(https://res.cloudinary.com/dpqdlkgsz/image/private/t_aparecium_minima/building/salkfpugoj6reihn7qmj.jpg)` }}
                >
                    
                </div>
                <div className="container">
                    <h1>Apt A</h1> 
                    <div className="grid-container-2">
                        <div className="grid-item">
                            <div className="row">
                                <h3>Description</h3>
                                <article>
                                    Sebuah hunian nyaman dengan tipe 1BR ini memiliki beragam faktor pendukung yang membuat hunian semakin nyaman. Tersedia untuk rent, unit ini menawarkan pemandangan City dengan kondisi Full Furnished yang terdiri dari AC, Bed, Dining Table, Gas Stove, Kitchen Set, Oven, Refrigerator, Sofa, TV, Wardrobe dan Water Heater.
                                </article>
                            </div>
                            <div className="row">
                                <h3>Facilities</h3>
                                <ul className="list-unstyled facilities-list">
                                    <li>Swimming Pool</li>
                                    <li>Tennis Court</li>
                                    <li>Squash Court</li>

                                </ul>
                            </div>
                            
                        </div>
                        <div className="grid-item">
                            <div className="row">
                                <h3>Location</h3>
                                <p>
                                    Stasiun Rawa Buaya
                                </p>
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
            </div>
            
        )
    }
}

export default PropertyDetail;