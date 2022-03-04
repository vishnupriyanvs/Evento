import React, { useState, useEffect } from "react";
import SizedBox from "../../components/sized-box";
import './index.css';
import { useNavigate, Link, Redirect } from "react-router-dom";
import EventsTable from "../../components/events-table";
import services from "../../constants";
import axios from 'axios';
import apiHandler from '../../api-handling';
import { useParams } from 'react-router-dom';
import tokenHandler from "../../api-handling/tokenHandler";


function UpcomingEvents(props) {
    const { id } = useParams()


    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    ;


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
        try {
            try {
                const response = await apiHandler('get', `events/status/Active`)
                setEvents(response.data)
            }
            catch (err) {
                const response = await tokenHandler('get', `events/status/Active`, sessionStorage.getItem('refreshToken'), apiHandler)
                setEvents(response.data)
            }
        } catch (error) {
            navigate('/')
        }


        //console.log(x.data);

    }, [])

    var today = new Date();
    events.forEach(async (event) => {
        if (event.start_date == today) {
            const x = await apiHandler('put', `events/${event.id}/InProgress`);
            //console.log(x);
        }
    })



    // console.log(events)
    return (
        <>
            <h5 className="heading">{props.toptitle}</h5>
            <div className="upcomingEventsTable">
                <SizedBox height="2vh" />
                <EventsTable
                    titles={['Event-Titles', 'Start Date', 'Status', 'Actions']}
                    events={events}
                    eventType={services.eventType.UPCOMING_EVENT}
                />
            </div>
        </>
    )
}

export default UpcomingEvents;

