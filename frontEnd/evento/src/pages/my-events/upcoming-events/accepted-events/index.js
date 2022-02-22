import React, { useState, useEffect } from "react";
import SizedBox from "../../../../components/sized-box";
import './index.css';
import { useNavigate } from "react-router-dom";
import MyEventsTable from "../../../../components/my-events-table";
import services from "../../../../constants";
import apiHandler from '../../../../api-handling';
import {useParams} from 'react-router-dom';
import tokenHandler from "../../../../api-handling/tokenHandler";

function AcceptedEvents(props) {
    
    const {id} = useParams()
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    
    useEffect(async () => {
        try{
          try {
            const x = await apiHandler('get',`invitations/response/Active/Yes/${id}`);
            setEvents(x.data);
        } catch (error) {
            const x = await tokenHandler('get',`invitations/response/Active/Yes/${id}`,sessionStorage.getItem('refreshToken'),apiHandler);
            setEvents(x.data);
        }
        }
        catch{
          navigate('/');
        }
      },[])
   
    return (
        <>
        <h5>{props.toptitle}</h5>
        <div className="upcomingEventsTable">
            <SizedBox height="2vh" />
            <MyEventsTable
                titles={['Event-Titles','Status', 'Start Date','End Date','Actions']}
                events={events}
                myEventType={services.myEventType.UPCOMING_EVENT.ACCEPTED_EVENT}
            />
        </div>
        </>
    )
}

export default AcceptedEvents;