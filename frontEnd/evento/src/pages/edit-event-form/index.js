import axios from 'axios'
import React,{useState,useEffect} from 'react'
import EventForm from "../../components/event-form";
import './index.css'
import {useParams} from 'react-router-dom';

function EditEventForm(){

    const {id,eventid} = useParams()
    //console.log('from update page = ' + id + ' ' + eventid)
    const [events,setEvents] = useState({})
    const [users,setUsers] = useState([])
    
     // const [submitted,setSubmitted] = useState(false)
    
    function handleChange(event){
        const name = event.target.name
        const value = event.target.value

        setEvents(values => ({...values,[name]:value}))
    }
    // setEvents(values => ({...values,"created_by":`${id}`}))
    //console.log('line 23' +events)

    useEffect(() => {
        axios.get(`http://localhost:4000/events/${eventid}`)
            .then(response => {
                console.log("Promise was fullfilled");
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
                console.log("Promise was fullfilles");
                //console.log(response);
                setUsers(response.data);
        });
      },[]);

    const handleSubmit = (event) => {
        console.log('line 35' + events)
        event.preventDefault()
        setEvents(values => ({...values,"updated_by": id}))
        // setSubmitted(true)
        console.log(events.created_by + 'helo')

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
                users = {users}
                buttonValue = "Update Event"
                updated_by = {id}
                eventid = {eventid} />
        </div>
    )

    
}

export default EditEventForm;