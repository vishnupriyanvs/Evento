import React, { useState, useEffect } from "react";
import SizedBox from "../../components/sized-box";
import './index.css';
import { useNavigate, Link } from "react-router-dom";
import EventsTable from "../../components/events-table";
import services from "../../constants";
import axios from 'axios';
import apiHandler from '../../api-handling';
import tokenHandler from '../../api-handling/tokenHandler';


function PastEvents(props) {

    const navigate = useNavigate();
    const navigateToEvent = (id) => {
        navigate(`../view-event/${id}`);
    }

    // const checkFilter = ["cancellationReason", "contact_person", "created_by", "description", "id", "imageUrl", "resourcePerson", "venue", "website"]

    const [events, setEvents] = useState([]);

    // useEffect(() => {
    //     axios
    //         .get('http://localhost:4000/events/status/Completed')
    //         .then(response => {
               
    //             setEvents(response.data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }, [])


      

      useEffect(async () => {
        try{
          try {
            const x = await apiHandler('get',`events/status/Completed`);
            //console.log(x.data);
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
     

    // useEffect(() => {
    //     checkFilter.forEach((data) => {
    //         events.filter((content) => { return delete content[data]
    //     })
    // }, [events])})


    return (
        <>
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