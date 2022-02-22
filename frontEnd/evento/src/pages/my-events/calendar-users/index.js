import React,{useState,useEffect} from 'react';
import './index.css';
import { useParams,useNavigate } from 'react-router-dom';
import CalendarEvents from '../../calendar';
import apiHandler from '../../../api-handling';
import tokenHandler from '../../../api-handling/tokenHandler';


function UserCalenderEvents() {

    const {id} = useParams();
    const [events,setEvents] = useState([]);
    const navigate = useNavigate();

    
    useEffect(async () => {
        try{
          try {
            const x = await apiHandler('get',`events/calendar/${id}`);
            setEvents(x.data);
        } catch (error) {
            const x = await tokenHandler('get',`events/calendar/${id}`,sessionStorage.getItem('refreshToken'),apiHandler);
            setEvents(x.data);
        }
        }
        catch{
          navigate('/');
        }
      },[])

     
   

    return (
        <div className="calenderSize">
            <CalendarEvents
                events={events}
            />
        </div>
    );

};

export default UserCalenderEvents;

