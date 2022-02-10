import Calendar from 'react-awesome-calendar';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './index.css';
import { useParams } from 'react-router-dom';

// const events = [{
//     id: 1,
//     color: '#fd3153',
//     from: '2022-01-01T18:00:00+00:00',
//     to: '2022-01-05T19:00:00+00:00',
//     title: 'React Learning'
// }, {
//     id: 2,
//     color: '#1ccb9e',
//     from: '2019-05-01T13:00:00+00:00',
//     to: '2019-05-05T14:00:00+00:00',
//     title: 'This is another event'
// }, {
//     id: 3,
//     color: '#3694DF',
//     from: '2019-05-05T13:00:00+00:00',
//     to: '2019-05-05T20:00:00+00:00',
//     title: 'This is also another event'
// }];

function CalenderEvents() {

    const {id} = useParams();

    const [events,setEvents] = useState([]);
    const allEvents = []

    useEffect(() => {
        axios.get(`http://localhost:4000/events/`)
            .then(response => {
                setEvents(response.data)
                console.log('promise fulfilled')
                console.log(events)
            })
            .catch(error => {
                console.log(error)
            })
    },[])

    console.log(events)
    events.forEach((item) => {
        if(`${item.isActive}` === 'Active'){
            allEvents.push({
                'id' : `${item.id}`,
                'from' : `${item.startDate}T${item.startTime}+00:00`,
                'to' : `${item.endDate}T${item.endTime}+00:00`,
                'title' : `${item.title}`,
                'color': '#3694DF'
            })
        }
        else if(`${item.isActive}` === 'InProgress'){
            allEvents.push({
                'id' : `${item.id}`,
                'from' : `${item.startDate}T${item.startTime}+00:00`,
                'to' : `${item.endDate}T${item.endTime}+00:00`,
                'title' : `${item.title}`,
                'color': '#FF8A00'
            })
        }
        else if(`${item.isActive}` === 'Completed'){
            allEvents.push({
                'id' : `${item.id}`,
                'from' : `${item.startDate}T${item.startTime}+00:00`,
                'to' : `${item.endDate}T${item.endTime}+00:00`,
                'title' : `${item.title}`,
                'color': '#1ccb9e'
            })
        }
        else{
            allEvents.push({
                'id' : `${item.id}`,
                'from' : `${item.startDate}T${item.startTime}+00:00`,
                'to' : `${item.endDate}T${item.endTime}+00:00`,
                'title' : `${item.title}`,
                'color': '#fd3153'
            })
        }
    })

    console.log(allEvents)
    return (
        <div className="calenderSize">
            <Calendar
                events={allEvents}
            />
        </div>
    );

};

export default CalenderEvents;

