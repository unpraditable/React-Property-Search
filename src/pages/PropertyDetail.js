//this page is for browse movie page, like for Top Movies and Popular Movies, also Search Results Page. Renders Movie Card Page and paginations

import React, {Component} from 'react'; 
import {Helmet} from "react-helmet";

class PropertyDetail extends Component {
    
    render() {
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
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
            
        )
    }
}

export default PropertyDetail;