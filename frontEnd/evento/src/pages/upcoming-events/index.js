import React from "react";
import SizedBox from "../../components/sized-box";
import './index.css';
import { useNavigate, Link } from "react-router-dom";
import EventsTable from "../../components/events-table";
import services from "../../services";


function UpcomingEvents() {
    const navigate = useNavigate();
    const navigateToEvent = (id)=>{
        navigate(`../view-event/${id}`);
       
    }


    return (
        <div className="upcomingEventsTable">
            <SizedBox height="2vh" />

            
            <EventsTable titles={['Event-Titles', 'Status', 'Start Date', 'Actions', 'End Date']} onClick={navigateToEvent} eventType={services.eventType.UPCOMING_EVENT}/>
        </div>

    )
}

export default UpcomingEvents;