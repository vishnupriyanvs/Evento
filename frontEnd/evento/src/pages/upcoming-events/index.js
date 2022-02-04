import React, { useState, useEffect } from "react";
import SizedBox from "../../components/sized-box";
import './index.css';
import { useNavigate, Link } from "react-router-dom";
import EventsTable from "../../components/events-table";
import services from "../../services";
import axios from 'axios';

import {useParams} from 'react-router-dom';

function UpcomingEvents() {
    const {id} = useParams()
    console.log('from Upcoming page '+id)
    
    const navigate = useNavigate();
    // const navigateToEvent = (eventid) => {
    //     navigate(`../view-event/${id}/${eventid}`);
    // }

    //  const navigateToEvent = (go) => {navigate(`../view-event/${id}/${go}`)} 
    //  const mapping = () => {
    //     events.map((event) => {navigateToEvent(event.id)})
    // }
    //  useEffect(() =>{
    //     // function mapping(){
    //     //     events.map((event) => {navigateToEvent(event.id)})
    //     // }
        
    //  },[])
     
    // const checkFilter = ["cancellationReason", "contact_person", "created_by", "description", "id", "imageUrl", "resourcePerson", "venue", "website","endDate"]

    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:4000/events/status/Active')
            .then(response => {
                console.log('Upcoming event Promise was fulfilled');
                setEvents(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

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
    
    console.log(events)
    return (
        <div className="upcomingEventsTable">
            <SizedBox height="2vh" />
            <EventsTable
                titles={['Event-Titles', 'Start Date','Status','Actions']}
                events={events}
                // onClick={navigateToEvent(events.id)}
                // onClick = {() => navigate(`../view-event/${id}/${events.id}`)}
                // onClick ={mapping}
                eventType={services.eventType.UPCOMING_EVENT}
            />
        </div>
    )
}

export default UpcomingEvents;

