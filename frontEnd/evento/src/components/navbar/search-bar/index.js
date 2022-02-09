import React, { useEffect, useState } from "react";
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SizedBox from "../../sized-box";
import axios from "axios";
import {Select} from 'react-select'

function SearchBar() {

   

    return (
        <div className="searchBar">
            <select type="search" placeholder="Search by date" className="searchBoxInput"/>
            <SizedBox width="0.5rem" />
            <FontAwesomeIcon icon={faSearch} size="2x" className="searchIcon" color="#91A4B7"/>

        </div>
        
    )
}

export default SearchBar;