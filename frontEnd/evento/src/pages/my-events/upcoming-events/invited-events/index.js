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
               
                setEvents(response.data)
                
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    

    const handleSubmit = (event) => {
        
        const value = event.target.value;
            axios   
                 .put(`http://localhost:4000/invitations/${events[0].id}`,{
                     invitationResponse:value
                 })
                 .then(response => {
                     setEvents(response.data)
                 })
                 .catch(error => {
                     console.log(error)
                 })

            // 
            window.location.reload(false);         
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