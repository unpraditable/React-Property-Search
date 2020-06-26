//This component is to Render Search Box. Main Purpose is to search movie

import React, {Component} from 'react'; 

class SearchSelectProperty extends Component {

    render() {
        //function to search with search box
        var search = function (e) {
            let searchQuery = document.getElementById('search-input').value;
            let selectedType = document.getElementById('select-type').value;

            e.preventDefault();
            if(selectedType === "apartment"){
                window.location.href=`/React-Property-Search/apartment?name=${searchQuery}`;
            }
            if(selectedType === "office"){
                window.location.href=`/React-Property-Search/office?name=${searchQuery}`;
            }
        }
      
        return (
            <div className="search-select">
                <form id="search-form-container" onSubmit={search.bind(this)}>
                    <input id="search-input" placeholder="Cari properti..." />
                    <i className="search-icon" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/search.svg)` }}></i>
                </form>

                <select id="select-type">
                    <option value="apartment">Apartment</option>
                    <option value="office">Office</option>
                </select>
            </div>

        )
    }
}

export default SearchSelectProperty;