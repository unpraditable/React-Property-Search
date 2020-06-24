import React, {Component} from 'react'; 
import {Helmet} from "react-helmet";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";
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
                <header>

                </header>
                <div className="container-fluid">
                    <div className="grid-container-2">
                        <div className="grid-item">
                            <div className="row grid-container-2">
                                <div className="property-card">
                                    <div className="img-container">
                                        <img src="https://res.cloudinary.com/dpqdlkgsz/image/private/t_aparecium_minima/building/rvyuo945prdxxycslud7.jpg" alt="Property Name" />
                                    </div>
                                    <div className="row property-desc">
                                        <h3>Studio - Tower Amsterdam</h3>
                                        <p className="desc">Sebuah hunian nyaman dengan tipe Studio ini memiliki beragam faktor pendukung yang membuat hunian semakin nyaman. Tersedia untuk rent, unit ini menawarkan pemandangan Pool dengan kondisi Full Furnished yang terdiri dari AC, Bed, Dining Table, Gas Stove, Kitchen Set, Refrigerator, TV dan Wardrobe.</p>
                                    </div>
                                    <div className="row city-row">
                                        <p><img className="paper-plane-icon" src={process.env.PUBLIC_URL + '/paper-plane.svg'} />Jakarta, Indonesia</p>
                                    </div>
                                    <div className="row button-row">
                                        <a className="link-button" href="#">
                                            Detail
                                        </a>
                                    </div>
                                </div>
                                <div className="property-card">
                                    <div className="img-container">
                                        <img src="https://res.cloudinary.com/dpqdlkgsz/image/private/t_aparecium_minima/building/rvyuo945prdxxycslud7.jpg" alt="Property Name" />
                                    </div>
                                    <div className="row property-desc">
                                        <h3>Studio - Tower Amsterdam</h3>
                                        <p className="desc">Sebuah hunian nyaman dengan tipe Studio ini memiliki beragam faktor pendukung yang membuat hunian semakin nyaman. Tersedia untuk rent, unit ini menawarkan pemandangan Pool dengan kondisi Full Furnished yang terdiri dari AC, Bed, Dining Table, Gas Stove, Kitchen Set, Refrigerator, TV dan Wardrobe.</p>
                                    </div>
                                    <div className="row city-row">
                                        <p><img className="paper-plane-icon" src={process.env.PUBLIC_URL + '/paper-plane.svg'} />Jakarta, Indonesia</p>
                                    </div>
                                    <div className="row button-row">
                                        <a className="link-button" href="#">
                                            Detail
                                        </a>
                                    </div>
                                </div>
                                <div className="property-card">
                                    <div className="img-container">
                                        <img src="https://res.cloudinary.com/dpqdlkgsz/image/private/t_aparecium_minima/building/rvyuo945prdxxycslud7.jpg" alt="Property Name" />
                                    </div>
                                    <div className="row property-desc">
                                        <h3>Studio - Tower Amsterdam</h3>
                                        <p className="desc">Sebuah hunian nyaman dengan tipe Studio ini memiliki beragam faktor pendukung yang membuat hunian semakin nyaman. Tersedia untuk rent, unit ini menawarkan pemandangan Pool dengan kondisi Full Furnished yang terdiri dari AC, Bed, Dining Table, Gas Stove, Kitchen Set, Refrigerator, TV dan Wardrobe.</p>
                                    </div>
                                    <div className="row city-row">
                                        <p><img className="paper-plane-icon" src={process.env.PUBLIC_URL + '/paper-plane.svg'} />Jakarta, Indonesia</p>
                                    </div>
                                    <div className="row button-row">
                                        <a className="link-button" href="#">
                                            Detail
                                        </a>
                                    </div>
                                </div>
                                <div className="property-card">
                                    <div className="img-container">
                                        <img src="https://res.cloudinary.com/dpqdlkgsz/image/private/t_aparecium_minima/building/rvyuo945prdxxycslud7.jpg" alt="Property Name" />
                                    </div>
                                    <div className="row property-desc">
                                        <h3>Studio - Tower Amsterdam</h3>
                                        <p className="desc">Sebuah hunian nyaman dengan tipe Studio ini memiliki beragam faktor pendukung yang membuat hunian semakin nyaman. Tersedia untuk rent, unit ini menawarkan pemandangan Pool dengan kondisi Full Furnished yang terdiri dari AC, Bed, Dining Table, Gas Stove, Kitchen Set, Refrigerator, TV dan Wardrobe.</p>
                                    </div>
                                    <div className="row city-row">
                                        <p><img className="paper-plane-icon" src={process.env.PUBLIC_URL + '/paper-plane.svg'} />Jakarta, Indonesia</p>
                                    </div>
                                    <div className="row button-row">
                                        <a className="link-button" href="#">
                                            Detail
                                        </a>
                                    </div>
                                </div>
                            </div>
                            
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