import Calendar from 'react-awesome-calendar';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import './index.css';
import { useParams } from 'react-router-dom';

function CalendarEvents(props) {

    const allEvents = [];

    props.events.forEach((item) => {
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

   
    return (
        <div className="calenderSize">
            <Calendar
                events={allEvents}
            />
        </div>
    );

};

export default CalendarEvents;

