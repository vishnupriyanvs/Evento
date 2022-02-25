import './index'
import React, { useEffect, useState } from 'react'
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { useNavigate, useParams } from 'react-router-dom';
import apiHandler from '../../../api-handling';
import tokenHandler from '../../../api-handling/tokenHandler';

function SearchBar(){
    const [events,setEvents] = useState([]);
    const options = [];
    const {id} = useParams()
    const navigate = useNavigate()

    const customStyles = {
        control: base => ({
          ...base,
        //   position : 'absolute',
          height: 40,
          fontSize: '15px',
            textAlign: 'left',
            width: '380px',
            // top:'0px',
            // left:'5px',
            fontWeight : 'lighter'
        })
      };

    useEffect(async () => {
        try{
            try{
                const response = await apiHandler('get',`events`)
                setEvents(response.data)
            }
            catch(err){
                const response = await tokenHandler('get',`events`,sessionStorage.getItem('refreshToken'),apiHandler)
                setEvents(response.data)
            }
        }
        catch(err){
            navigate("/")
        }    
    },[])

    
    events.map((celeb) => {
        const obj = {value : `${celeb.id}`, label : `${celeb.title}`}
        options.push(obj);
    });
   

   function handleChange(event){
        navigate(`/user/view-event/${id}/${event.value}`)
   }

    return(
        <Form >
            <Select 
                id='search'
                options = {options}
                onChange = {handleChange}
                placeholder = 'Search for Events'
                styles={customStyles}
            ><h1>HI</h1></Select>
        </Form>
    )
}

export default SearchBar;