import React, { useState, useEffect } from "react";
import SizedBox from "../../components/sized-box";
import './index.css';
import { useNavigate, Link } from "react-router-dom";
import EventsTable from "../../components/events-table";
import services from "../../constants";
import axios from 'axios';
import apiHandler from '../../api-handling';
import {useParams} from 'react-router-dom';
import tokenHandler from "../../api-handling/tokenHandler";

function UpcomingEvents(props) {
    const {id} = useParams()
   
    
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    // useEffect(() => {
    //     axios
    //         .get('http://localhost:4000/events/status/Active')
    //         .then(response => {
                
    //             setEvents(response.data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }, [])

    useEffect(async () => {
        try{
            const x = await apiHandler('get',`events/status/Active`)
            setEvents(x.data)
        }
        catch(err){
            const x = await tokenHandler('get',`events/status/Active`,sessionStorage.getItem('refreshToken'),apiHandler)
            setEvents(x.data)
        }
        
        //console.log(x.data);
        
      },[])

// console.log(events)
    return (
        <>
        <h5 className="heading">{props.toptitle}</h5>
        <div className="upcomingEventsTable">
            <SizedBox height="2vh" />
            <EventsTable
                titles={['Event-Titles', 'Start Date','Status','Actions']}
                events={events}
                eventType={services.eventType.UPCOMING_EVENT}
            />
        </div>
        </>
    )
}

export default UpcomingEvents;

