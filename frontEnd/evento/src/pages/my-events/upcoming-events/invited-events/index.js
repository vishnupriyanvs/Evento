import React, { useState, useEffect } from "react";
import SizedBox from "../../../../components/sized-box";
import './index.css';
import { useNavigate, Link } from "react-router-dom";
import MyEventsTable from "../../../../components/my-events-table";
import services from "../../../../services";
import axios from 'axios';


import {useParams} from 'react-router-dom';



function InvitedEvents() {
    const {id} = useParams()
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    
    

    useEffect(() => {
        axios
            .get(`http://localhost:4000/invitations/response/Active/NotResponded/${id}`)
            .then(response => {
                console.log('Upcoming event Promise was fulfilled');
                setEvents(response.data)
                
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    

    const handleSubmit = (event) => {
        const value = event.target.value;
        console.log(value)
        console.log(events[0].id)
        
        event.preventDefault()
        
        // setSubmitted(true)
        console.log(events.created_by + 'helo')

            axios   
                 .put(`http://localhost:4000/invitations/${value}/${events[0].id}`,events)
                 .then(response => {
                     setEvents(response.data)
                 })
                 .catch(error => {
                     console.log(error)
                 })
                //navigate(`/user/my-events/upcoming-events/invited/${id}`);
                
    }

    // useEffect(() => {
    //     checkFilter.forEach((data) => {
    //         events.filter((content) => { return delete content[data] })
    //     })
    // }, [events])
    
    // const viewEventDetails = (() => {
    //     events.map((event) => {
    //         onClick = {() => navigate(`../view-event/${id}/${event.id}`)} 
    //     })
    // })

    
  
    
// {staffs.map((staff) => (
//     <span key={staff.StaffID}>
//       <Staff details={staff} />
//     </span>
//   ))}
    
    //console.log(events)
    return (
        <div className="upcomingEventsTable">
            <SizedBox height="2vh" />
            <MyEventsTable
                titles={['Event-Titles', 'Start Date','End Date','Status','Actions']}
                events={events}
                handleSubmit={handleSubmit}
                // onClick={navigateToEvent(events.id)}
                // onClick = {() => navigate(`../view-event/${id}/${events.id}`)}
                // onClick ={mapping}
                myEventType={services.myEventType.UPCOMING_EVENT.INVITED_EVENT}
            />
        </div>
    )
}

export default InvitedEvents;