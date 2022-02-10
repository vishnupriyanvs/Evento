import axios from 'axios'
import React,{useState,useEffect} from 'react'
import EventForm from "../../components/event-form";
import './index.css'

import {useParams} from 'react-router-dom';

function CreateEventForm(){
    const {id} = useParams()

    
    const [events,setEvents] = useState({})
    const [users,setUsers] = useState([])
     const options = []
    
    
    function handleChange(event){
        
        let name,value;
        if(event.name == 'contact_person'){
             name = event.name
             value = event.value 
        }
        else
        {
             name = event.target.name 
             value = event.target.value  
        }
        setEvents(values => ({...values,[name]:value}))
    }
   
    useEffect(() => {
        axios
            .get("http://localhost:4000/users/contactpersons")
                .then((response) => {
                setUsers(response.data);
        });
      }, []);

      users.map((user) => {
        const obj = {value : `${user.id}`,  label: `${user.name}`, name : 'contact_person'}
        options.push(obj)
      })

     

    const handleSubmit = (event) => {
        
        event.preventDefault()
        setEvents(values => ({...values,"created_by": id,"updated_by" : id}))
        

            axios   
                 .post('http://localhost:4000/events/',events)
                 .then(response => {
                     setEvents(response.data)
                     alert(`${events.title} added successfully`)
                 })
                 .catch(error => {
                     console.log(error)
                 })
    }

    const handleReset = () => {
        console.clear()
    }

   
    return(
        <div className="createEventForm">
            <EventForm 
                events = {events}
                handleSubmit = {handleSubmit}
                handleChange = {handleChange} 
                handleReset = {handleReset}
                users = {options}
                buttonValue = "Create Event"
                created_by = {id} />
        </div>
    )
}

export default CreateEventForm;