import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './index.css';
import { useParams } from 'react-router-dom';
import CalendarEvents from '../calendar';

function AdminCalenderEvents() {

    const {id} = useParams();
    const [events,setEvents] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:4000/events/`)
            .then(response => {
                setEvents(response.data)
                
                
            })
            .catch(error => {
                console.log(error)
            })
    },[])

   

    return (
        <div className="calenderSize">
            <CalendarEvents
                events={events}
            />
        </div>
    );

};

export default AdminCalenderEvents;

