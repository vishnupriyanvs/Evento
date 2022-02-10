import './index'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SizedBox from "../../sized-box";

function SearchBar(){
    const [events,setEvents] = useState([]);
    const options = [];
    const {id} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        axios.get('http://localhost:4000/events/')
            .then(response => {
                setEvents(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    },[])

    //console.log(events)
    events.map((celeb) => {
        const obj = {value : `${celeb.id}`, label : `${celeb.title}`}
        options.push(obj);
    });
   // console.log(options)

   function handleChange(event){
       console.log(event)
        navigate(`/user/view-event/${id}/${event.value}`)
   }

    return(
        <Form >
            <Select 
                id='search'
                options = {options}
                onChange = {handleChange}
                placeholder = 'Search for events'
            ><h1>HI</h1></Select>
            {/* <SizedBox width="5em" />
            <FontAwesomeIcon icon={faSearch} size="2x" className="searchIcon" color="#91A4B7"/> */}

        </Form>
    )
}

export default SearchBar;