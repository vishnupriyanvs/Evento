import React, { useState, useEffect } from "react";
import SizedBox from "../../components/sized-box";
import './index.css';
import { useNavigate, Link } from "react-router-dom";
import EventsTable from "../../components/events-table";
import services from "../../constants";
import axios from 'axios';
import apiHandler from '../../api-handling';
import tokenHandler from "../../api-handling/tokenHandler";


function OngoingEvents(props) {

    const navigate = useNavigate();
    const navigateToEvent = (id) => {
        navigate(`../view-event/${id}`);
    }

    // const checkFilter = ["cancellationReason","contactPerson", "created_by", "description", "id", "imageUrl", "resourcePerson", "venue", "website"]

    const [events, setEvents] = useState([]);

    // useEffect(() => {
    //     axios
    //         .get('http://localhost:4000/events/status/InProgress')
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
            const x = await apiHandler('get',`events/status/InProgress`);
            //console.log(x.data);
            setEvents(x.data);
        } catch (error) {
            const x = await tokenHandler('get',`events/status/InProgress`,sessionStorage.getItem('refreshToken'),apiHandler);
            setEvents(x.data);
        }
        }
        catch{
          navigate('/');
        }
      },[])


    // useEffect(() => {
    //     checkFilter.forEach((data) => {
    //         events.filter((content) => { return delete content[data] })
    //     })
    // }, [events])

    function Today(){
        let today;
        if(new Date().getMonth() <10){
            today = `${new Date().getFullYear()}-0${new Date().getMonth() + 1}-${new Date().getDate()}`
        }
        else{
            today = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
        }
        console.log(today)
        return today;
    }
    //console.log(Today())
    const today = Today()
    //console.log(today )
    //console.log(typeof(today))

    //console.log(events)
    events.forEach(async (event) => {
        if(event.end_date == today){
            try {
                const response = await apiHandler('put',`events/${event.id}/Completed`, null, false);
                //console.log(x);
            } catch (error) {
                const response = await tokenHandler('put',`events/${event.id}/Completed`,sessionStorage.getItem('refreshToken'),apiHandler, null, false)
            }
        }
      })

   
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