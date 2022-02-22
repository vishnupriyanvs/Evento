import React, { useState, useEffect } from "react";
import SizedBox from "../../../components/sized-box";
import './index.css';
import { useNavigate} from "react-router-dom";
import MyEventsTable from "../../../components/my-events-table";
import services from "../../../constants";
import apiHandler from '../../../api-handling';
import tokenHandler from "../../../api-handling/tokenHandler";
import {useParams} from 'react-router-dom';


function UserCancelledEvents(props) {
  
    const {id} = useParams()
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    useEffect(async () => {
        try{
          try {
            const x = await apiHandler('get',`invitations/response/Cancelled/${id}`);
            setEvents(x.data);
        } catch (error) {
            const x = await tokenHandler('get',`invitations/response/Cancelled/${id}`,sessionStorage.getItem('refreshToken'),apiHandler);
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
            <MyEventsTable
                titles={['Event-Titles', 'Status','Start Date']}
                events={events}
                myEventType={services.myEventType.CANCELLED_EVENT}
            />
        </div></>
    )
}

export default UserCancelledEvents;