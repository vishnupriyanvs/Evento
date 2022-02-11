import axios from 'axios'
import React,{useState,useEffect} from 'react'
import EventForm from "../../components/event-form";
import './index.css'
import {useParams} from 'react-router-dom';

function EditEventForm(){

    const {id,eventid} = useParams()
    
    const [events,setEvents] = useState({})
    const [users,setUsers] = useState([])
    const options = []
     // const [submitted,setSubmitted] = useState(false)
    
    function handleChange(event){
        const name = event.target.name
        const value = event.target.value

        setEvents(values => ({...values,[name]:value}))
    }
    // setEvents(values => ({...values,"created_by":`${id}`}))
    
    useEffect(() => {
        axios.get(`http://localhost:4000/events/${eventid}`)
            .then(response => {
               
                setEvents(response.data);
            })
            .catch(error => {
                console.log(error)
            })
    },[])

    useEffect(() => {
        axios
            .get("http://localhost:4000/users/contactpersons")
                .then((response) => {
               
                
                setUsers(response.data);
        });
      },[]);

      users.map((user) => {
        const obj = {value : `${user.id}`,  label: `${user.name}`}
        options.push(obj)
      })

    const handleSubmit = (event) => {
        
        event.preventDefault()
        setEvents(values => ({...values,"updated_by": id}))
        // setSubmitted(true)
       

            axios   
                 .put(`http://localhost:4000/events/${eventid}`,events)
                 .then(response => {
                     setEvents(response.data)
                     alert(`${events.title} updated successfully`)
                 })
                 .catch(error => {
                     console.log(error)
                 })
    }

    const handleReset = () => {
        console.clear()
        // setSubmitted(false)
    }

    return(
        <div className="createEventForm">
            <EventForm 
                events = {events}
                handleSubmit = {handleSubmit}
                handleChange = {handleChange} 
                handleReset = {handleReset}
                users = {options}
                buttonValue = "Update Event"
                updated_by = {id}
                eventid = {eventid} 
                disabled = {true}/>
        </div>
    )

    
}

export default EditEventForm;