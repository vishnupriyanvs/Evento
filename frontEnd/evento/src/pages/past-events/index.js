import React, { useState, useEffect} from "react";
import SizedBox from "../../components/sized-box";
import './index.css';
import { useNavigate} from "react-router-dom";
import EventsTable from "../../components/events-table";
import services from "../../constants";
import apiHandler from '../../api-handling';
import tokenHandler from '../../api-handling/tokenHandler';



function PastEvents(props) {

    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    const navigateToEvent = (id) => {
        navigate(`../view-event/${id}`);
    }
    
    //Getting event details from backend
    useEffect(async () => {
        try{
          try {
            const x = await apiHandler('get',`events/status/Completed`);
            setEvents(x.data);
        } catch (error) {
            const x = await tokenHandler('get',`events/status/Completed`,sessionStorage.getItem('refreshToken'),apiHandler);
            setEvents(x.data);
        }
        }
        catch{
          navigate('/');
        }
      },[])
     

    return (
        <>
        <p>{props.toptitle}</p>
        <div className="upcomingEventsTable">
            <SizedBox height="2vh" />
            <EventsTable
                titles={['Event-Titles', 'Start Date', 'End Date','Status']}
                events={events}
                onClick={navigateToEvent}
                eventType={services.eventType.COMPLETED_EVENT}
            />
        </div>
        </>
    )
}

export default PastEvents;