//This component is to Render Search Box. Main Purpose is to search movie

import React, {Component} from 'react'; 

class SearchSelectProperty extends Component {

    render() {
        //function to search with search box
        var search = function (e) {
            let searchQuery = document.getElementById('searchForm').value;
            let selectedType = document.getElementById('selectType').value;

            e.preventDefault();
            if(selectedType === "apartment"){
                window.location.href=`/apartment?name=${searchQuery}`;
            }
            if(selectedType === "office"){
                window.location.href=`/office?name=${searchQuery}`;
            }
        }
      
        return (
            <div id="searchSelect" className="search-select">
                <form  onSubmit={search.bind(this)}>
                    <input id="searchForm" placeholder="Cari properti Anda di sini..."></input>
                </form>

                <select id="selectType">
                    <option value="apartment">Apartment</option>
                    <option value="office">Office</option>
                </select>
            </div>

        )
    }
}

export default SearchSelectProperty;