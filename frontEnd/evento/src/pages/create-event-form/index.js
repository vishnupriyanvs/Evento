import axios from 'axios'
import React,{useState,useEffect} from 'react'
import EventForm from "../../components/event-form";
import './index.css'

function CreateEventForm(){

    const [events,setEvents] = useState({})
    const [users,setUsers] = useState([])
     // const [submitted,setSubmitted] = useState(false)
    
    function handleChange(event){
        const name = event.target.name
        const value = event.target.value

        setEvents(values => ({...values,[name]:value}))
    }

    useEffect(() => {
        axios
            .get("http://localhost:4000/users/contactpersons")
                .then((response) => {
                //console.log("Promise was fullfilles");
                //console.log(response);
                setUsers(response.data);
        });
      }, []);

    const handleSubmit = (event) => {
        console.log(events)
        event.preventDefault()
        // setSubmitted(true)

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
        // setSubmitted(false)
    }

    return(
        <div className="createEventForm">
            <EventForm 
                events = {events}
                handleSubmit = {handleSubmit}
                handleChange = {handleChange} 
                handleReset = {handleReset}
                users = {users}
                buttonValue = "Create Event"/>
        </div>
    )
}

export default CreateEventForm;