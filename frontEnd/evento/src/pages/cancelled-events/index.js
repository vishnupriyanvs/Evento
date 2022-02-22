import React, { useState, useEffect } from "react";
import SizedBox from "../../components/sized-box";
import './index.css';
import { useNavigate} from "react-router-dom";
import EventsTable from "../../components/events-table";
import services from "../../constants";
import apiHandler from '../../api-handling';
import tokenHandler from "../../api-handling/tokenHandler";


function CancelledEvents(props) {

    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    const navigateToEvent = (id) => {
        navigate(`../view-event/${id}`);
    }
    

    useEffect(async () => {
        try {
            try {
                const x = await apiHandler('get', `events/status/Cancelled`)
                setEvents(x.data)
            }
            catch (err) {
                const x = await tokenHandler('get', `events/status/Cancelled`,sessionStorage.getItem('refreshToken'),apiHandler)
                setEvents(x.data)
            }
        }
        catch (err) {
            navigate('/')
        }
    }, [])

    return (
        <>
            <p>{props.toptitle}</p>
            <div className="upcomingEventsTable">
                <SizedBox height="2vh" />
                <EventsTable
                    titles={['Event-Titles', 'Start Date', 'Status']}
                    events={events}
                    onClick={navigateToEvent}
                    eventType={services.eventType.CANCELED_EVENT}
                />
            </div>
        </>
    )
}

export default CancelledEvents;