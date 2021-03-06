import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './index.css';
import { useParams } from 'react-router-dom';
import CalendarEvents from '../calendar';
import apiHandler from '../../api-handling';
import tokenHandler from '../../api-handling/tokenHandler';
import {useNavigate} from 'react-router-dom'

function AdminCalenderEvents() {

    const { id } = useParams();
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(async () => {
        try {
            try {
                const x = await apiHandler('get', `events`)
                //console.log(x.data);
                setEvents(x.data)
            }
            catch (err) {
                const x = await tokenHandler('get', `events`,sessionStorage.getItem('refreshToken'),apiHandler)
                //console.log(x.data);
                setEvents(x.data)
            }
        }
        catch (err) {
            navigate("/")
        }

    }, [])


    return (
        <div className="calenderSize">
            <CalendarEvents
                events={events}
            />
        </div>
    );
};

export default AdminCalenderEvents;

