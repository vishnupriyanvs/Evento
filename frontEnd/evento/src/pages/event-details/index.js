import './index.css'
import { useState, useEffect, React } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faEdit, faClock, faUserAlt, faGlobe, faPhone } from "@fortawesome/free-solid-svg-icons";


function ViewEvents() {

    const navigate = useNavigate();
    const [events, setEvents] = useState({});
    const [users, setUsers] = useState([]);
    const [participants, setParticipants] = useState(0)
    const [participantResponse, setParticipantRespponse] = useState([])
    const { id, eventid } = useParams()
    

    useEffect(() => {
        axios.get(`http://localhost:4000/events/${eventid}`)
            .then(response => {
               
                setEvents(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
        infoParticipants(eventid);
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:4000/users/${events.contact_person}`)
            .then(response => {
                setUsers(response.data)
            })
            .catch((err) => {
                console.log(err)
            })


    }, [events])

    const infoParticipants = (eventid) => {

        const config = {
            method: 'get',
            url: `http://localhost:4000/invitations/${eventid}`,
        };
        axios(config).then((response) => {

            setParticipants(response.data.length)
            response.data.forEach((item, i) => {

              
                participantResponse.push({ "name": item.user.name, "response": item.invitationResponse });
            })

        })
        setParticipantRespponse(participantResponse)
       
    }

    let action = false;
    if (events.isActive == 'Active') {
        action = true;
    }

    return (
        <>
            <div className="cards-container">
                <div className="cards">
                    <img src="https://effectussoftware.com/blog/wp-content/uploads/2020/02/What-is-React-JS.jpg" />
                    <div className="contentss">
                        <div className='event-content'>
                            {action && <div>
                                <FontAwesomeIcon icon={faUserPlus} onClick={() => navigate(`/user/sendinvitations/${id}/${eventid}`)} />
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <FontAwesomeIcon icon={faEdit} onClick={() => navigate(`/user/edit-event/${id}/${eventid}`)} />
                            </div>}
                            <div className='content-event-title'>{events.title}</div>
                            <div className='content-event-description'>{events.description}</div>
                        </div>    

                        <div className='event-fixture'>
                            <div className='content-event-date'>
                                <FontAwesomeIcon icon={faClock} /> <span>{events.startDate} : {events.endDate}</span>
                                <div className='content-event-venue'><a href="#">{events.venue}</a></div>
                            </div>

                            <div className='content-event-contact-person'><FontAwesomeIcon icon={faUserAlt} /><span>{events.resourcePerson}</span></div>
                        </div>

                        <div className='content-event-further-info'>
                            <div className='flex-left'><div><FontAwesomeIcon icon={faGlobe} />&nbsp;&nbsp;&nbsp;{events.website ? events.website : "www.no-website.com"}</div></div>
                            <div className='flex-right'>
                                <div className='flex-side-left'>
                                    <FontAwesomeIcon icon={faPhone} />
                                </div>
                                <div className='flex-side-right'>
                                    <div>{users.name}</div>
                                    <div>{users.email}</div>
                                    <div>{users.contact}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
                            <h1>{participants}</h1>
                        </div>
                    </div>
                </div>

                <div className='event-invitee-response'>
                    <div className='flex-table'>
                        <div className='flex-th'>
                            <div className='flex-th-content'>Invitees</div>
                            <div className='flex-th-content'>Response</div>
                        </div>


                        {
                            participantResponse.map((item, i) => {

                                return (
                                    <div className='flex-tr'>
                                        <div className='flex-td'>{item.name}</div>
                                        <div className='flex-td'>{item.response}</div>
                                    </div>
                                )
                            }

                            )
                        }



                    </div>

                </div>
            </div>
        </>

    )
}

export default ViewEvents;