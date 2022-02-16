import React, { useState, useEffect } from "react";
import SizedBox from "../../../components/sized-box";
import './index.css';
import { useNavigate, Link } from "react-router-dom";
import MyEventsTable from "../../../components/my-events-table";
import services from "../../../constants";
import axios from 'axios';
import apiHandler from '../../../api-handling';

import {useParams} from 'react-router-dom';

function UserCancelledEvents(props) {
    const {id} = useParams()
  
    
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

    // useEffect(() => {
    //     axios
    //         .get(`http://localhost:4000/invitations/response/Cancelled/${id}`)
    //         .then(response => {
               

    //             setEvents(response.data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }, [])

    useEffect(async () => {
        const x = await apiHandler('get',`invitations/response/Cancelled/${id}`)
        //console.log(x.data);
        setEvents(x.data)
      },[])


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
        <>
        <p>{props.toptitle}</p>
        <div className="upcomingEventsTable">
            <SizedBox height="2vh" />
            <MyEventsTable
                titles={['Event-Titles', 'Start Date','Status']}
                events={events}
                // onClick={navigateToEvent(events.id)}
                // onClick = {() => navigate(`../view-event/${id}/${events.id}`)}
                // onClick ={mapping}
                myEventType={services.myEventType.CANCELLED_EVENT}
            />
        </div></>
    )
}

export default UserCancelledEvents;