import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './index.css';
import { useParams } from 'react-router-dom';
import CalendarEvents from '../calendar';
import apiHandler from '../../api-handling';

function AdminCalenderEvents() {

    const {id} = useParams();
    const [events,setEvents] = useState([]);

    // useEffect(() => {
    //     axios.get(`http://localhost:4000/events/`)
    //         .then(response => {
    //             setEvents(response.data)
                
                
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    // },[])
    useEffect(async () => {
        const x = await apiHandler('get',`events/${id}`)
        //console.log(x.data);
        setEvents(x.data)
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

