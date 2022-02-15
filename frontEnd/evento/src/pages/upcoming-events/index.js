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
   
    
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:4000/events/status/Active')
            .then(response => {
                
                setEvents(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
console.log(events)
    return (
        <div className="upcomingEventsTable">
            <SizedBox height="2vh" />
            <EventsTable
                titles={['Event-Titles', 'Start Date','Status','Actions']}
                events={events}
                eventType={services.eventType.UPCOMING_EVENT}
            />
        </div>
    )
}

export default UpcomingEvents;

