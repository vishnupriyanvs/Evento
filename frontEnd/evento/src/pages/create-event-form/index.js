import axios from 'axios'
import React,{useState} from 'react'
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

    const handleSubmit = (event) => {
        console.log(events)
        event.preventDefault()
        // setSubmitted(true)

            axios   
                 .post('http://localhost:4000/events/',events)
                 .then(response => {
                     console.log(response)
                     alert(`${events.title} added successfully`)
                 })
                 .catch(error => {
                     console.log(error)
                 })
    }

    axios
        .get('http://localhost:4000/users/contactpersons')
            .then(response => {
                setUsers(response.data)
            })

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
                buttonValue = "Create Event"/>
        </div>
    )
}

export default CreateEventForm;