import './index.css'
import {useState,useEffect,React} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


function ViewEvents() {

    const [events,setEvents] = useState({});
    const [users,setUsers] = useState([]);
    const {eventid} = useParams()
    //console.log(eventid)

    useEffect(() => {
        axios.get(`http://localhost:4000/events/${eventid}`)
            .then(response => {
                //console.log('Past event Promise was fulfilled');
                setEvents(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])  
    
    useEffect(() => {
        axios.get(`http://localhost:4000/users/${events.contact_person}`)
        .then(response => {
            setUsers(response.data)
        })
        .catch((err)=> {
            console.log(err)
        })
    },[events])
    
    return (
        <>
            <div className="cards-container">
                <div className="cards">
                    <img src="https://effectussoftware.com/blog/wp-content/uploads/2020/02/What-is-React-JS.jpg" />
                    <div className="contentss">
                        <div className='event-content'>
                            <div className='content-event-title'>{events.title}</div>
                            <div className='content-event-description'>{events.description}</div>
                        </div>

                        <div className='event-fixture'>
                            <div className='content-event-date'>
                            <span>{events.startDate} : {events.endDate}
                            </span>    
                            </div>
                            <div className='content-event-venue'><a>{events.venue}</a></div>
                            <div className='content-event-contact-person'>{events.resourcePerson}</div>
                        </div>

                        <div className='content-event-further-info'>
                            <div>{events.website}</div>
                            <div>{users.name}</div>
                            <div>{users.email}</div>
                            <div>{users.contact}</div>
                        </div>
                    </div></div>

                <div className='event-invitees-participants'>
                    <div className='event-invitees'>
                        <div>Icon</div>
                        <div>
                            <b>Invitees</b>
                            <h1>80</h1>
                        </div>
                    </div>

                    <div className='event-participants'>
                        <div>Icon</div>
                        <div>
                            <b>Participants</b>
                            <h1>180</h1>
                        </div>
                    </div>
                </div>

                <div className='event-invitee-response'>
                    <div className='flex-table'>
                        <div className='flex-th'>
                            <div className='flex-th-content'>Invitees</div>
                            <div className='flex-th-content'>Response</div>
                        </div>

                        <div className='flex-tr'>
                            <div className='flex-td'>Nihal</div>
                            <div className='flex-td'>Yes</div>
                        </div>

                    </div>

                </div>
            </div>
        </>

    )
}

export default ViewEvents;