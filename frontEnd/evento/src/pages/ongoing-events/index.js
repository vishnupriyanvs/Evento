import React, { useState, useEffect } from "react";
import SizedBox from "../../components/sized-box";
import './index.css';
import { useNavigate, Link } from "react-router-dom";
import EventsTable from "../../components/events-table";
import services from "../../services";
import axios from 'axios';


function OngoingEvents(props) {

    const navigate = useNavigate();
    const navigateToEvent = (id) => {
        navigate(`../view-event/${id}`);
    }

    // const checkFilter = ["cancellationReason","contactPerson", "created_by", "description", "id", "imageUrl", "resourcePerson", "venue", "website"]

    const [events, setEvents] = useState([]);

    useEffect(() => {
        axios
            .get('http://localhost:4000/events/status/InProgress')
            .then(response => {
                
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

   
    return (
        <>
        <p>{props.toptitle}</p>
        <div className="upcomingEventsTable">
            <SizedBox height="2vh" />
            <EventsTable
                titles={['Event-Titles', 'Start Date','End Date','Status']}
                events={events}
                onClick={navigateToEvent}
                eventType={services.eventType.ONGOING_EVENT}
            />
        </div>
        </>
    )
}

export default OngoingEvents;