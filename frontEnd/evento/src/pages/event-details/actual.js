import './index.css'
import { useState, useEffect, React } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faEdit, faClock, faUserAlt, faGlobe, faPhone, faUsers, faUserCheck, faUser, faMailBulk } from "@fortawesome/free-solid-svg-icons";
import apiHandler from '../../api-handling';
import tokenHandler from '../../api-handling/tokenHandler';

function ViewEvents() {

    const navigate = useNavigate();
    const [events, setEvents] = useState({});
    const [users, setUsers] = useState([]);
    const [participants, setParticipants] = useState(0)
    const [participantResponse, setParticipantRespponse] = useState([]);
    const [invitees, setInvitees] = useState([]);
    const [feedbackState, setFeedbackState] = useState([])
    const [cancellationReason, setCancellationReason] = useState([]);
    const { id, eventid } = useParams();
    let feedbacks = []

    useEffect(async () => {
        try {
            try {
                const x = await apiHandler('get', `events/${eventid}`);
                setEvents(x.data);
                infoParticipants(eventid);
            } catch (error) {
                const x = await tokenHandler('get', `events/${eventid}`, sessionStorage.getItem('refreshToken'), apiHandler);
                setEvents(x.data);
                infoParticipants(eventid);
            }
        }
        catch {
            navigate('/');
        }
    }, [])

    useEffect(async () => {
        try {
            try {
                const x = await apiHandler('get', `users/${events.contact_person}`);
                //console.log(x.data);
                setUsers(x.data)
            } catch (error) {
                const x = await tokenHandler('get', `users/${events.contact_person}`, sessionStorage.getItem('refreshToken'), apiHandler);
                setUsers(x.data)
            }
        }
        catch {
            navigate('/');
        }
    }, [events,])

    // useEffect(() => {
    //     setFeedbackState(feedbackState)
    // }, [feedbacks])

    const infoParticipants = async (eventid) => {

        const response = await apiHandler('get', `invitations/event/${eventid}`)
        setParticipants(response.data.length)
        response.data.forEach((item, i) => {
            participantResponse.push({ "id": item.id, "name": item.user.name, "response": item.invitationResponse });
        })
        console.log(response.data)
        let invites = response.data;
        invites = invites.filter((item, i) => { if (item.invitationResponse === 'Yes') return item })
        setInvitees(invites);
        // 
        invites.forEach(async (item, i) => {
            const x = await apiHandler('get', `feedbacks/${item.id}`);
            feedbacks.push(x.data)
            console.log(x.data)
            setFeedbackState([...feedbackState, x.data]);
        })


        invites = response.data.filter((item, i) => { if (item.invitationResponse === 'No') return item })
        setCancellationReason(invites);
        setParticipantRespponse(participantResponse)
    }
    let action = false;
    if (events.isActive == 'Active') {
        action = true;
    }

    return (
        <>
            <div className="cards-container">
                <div className="next-half">
                    <div className="cards">
                        <img src={`http://localhost:4000/images/download/${eventid}`} />
                        <div className="contentss">
                            <div className='event-content'>
                                {action && <div className='event-action'>
                                    <FontAwesomeIcon icon={faUserPlus} onClick={() => navigate(`/user/sendinvitations/${id}/${eventid}`)} />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <FontAwesomeIcon icon={faEdit} onClick={() => navigate(`/user/edit-event/${id}/${eventid}`)} />
                                </div>}
                                <div className='content-event-title'>{events.title}</div>
                                <div className='content-event-description'>{events.description}</div>
                            </div>
                            <hr></hr>
                            <div className='card-data'>
                                <div className='flex-right'>
                                    <div><FontAwesomeIcon icon={faUser} /> &nbsp;&nbsp;{users.name}</div>
                                    <div className='mail'><FontAwesomeIcon icon={faMailBulk} /> &nbsp;&nbsp;<span>{users.email}</span></div>
                                    <div><FontAwesomeIcon icon={faPhone} /> &nbsp;&nbsp;{users.contact}</div>
                                </div>

                                <div class="vl"></div>
                                <div className='event-fixture'>
                                    <div className='content-event-date'>
                                        <FontAwesomeIcon icon={faClock} /> <span>{events.startDate} : {events.endDate}</span>
                                        <div className='content-event-venue'><a href="#">{events.venue}</a></div>
                                    </div>
                                </div>

                                <div class="vl"></div>
                                <div className='flex-left'>
                                    <div className='content-event-contact-person'><FontAwesomeIcon icon={faUserAlt} /><span>{events.resourcePerson}</span></div>
                                    <div><FontAwesomeIcon icon={faGlobe} />&nbsp;&nbsp;&nbsp;<span>{events.website ? events.website : "www.no-website.com"}</span></div>
                                </div>


                            </div>
                        </div>
                    </div>

                    <div className='event-invitees-participants'>
                        <div className='event-invitees'>
                            <div><FontAwesomeIcon icon={faUsers} size={"3x"} /></div>
                            <div>
                                Invitees
                                <h1>{participants}</h1>
                            </div>
                        </div>

                        <div className='event-participants'>
                            <div><FontAwesomeIcon icon={faUserCheck} size={"3x"} /></div>
                            <div>
                                Participants
                                <h1>{invitees.length}</h1>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='second-half'>
                    <div className='event-invitee-response'>
                        <div className='flex-table'>
                            <div className='flex-th'>
                                <div className='flex-th-content'>Invitees</div>
                                <div className='flex-th-content'>Response</div>
                                <div className='flex-th-content'>Cancellation Reason</div>
                                <div className='flex-th-content'>Feedback</div>
                            </div>



                            {
                                participantResponse.map((item, i) => {

                                    cancellationReason.forEach((content, key) => {
                                        if (content.id === item.id) item['reason'] = content['invitationCancelReason']
                                    })

                                    feedbackState.forEach((content, key) => {
                                        if (content.invitationId === item.id && content.id !== item.id) item['feedback'] = content['feedback']
                                    })
                                    return (
                                        <div className='flex-tr'>
                                            <div className='flex-td'>{item.name}</div>
                                            <div className='flex-td'>{item.response}</div>
                                            <div className='flex-td'>{item.reason ? item.reason : null}</div>
                                            <div className='flex-td'>{item.feedback ? item.feedback : null}</div>
                                        </div>
                                    )
                                }
                                )
                            }
                        </div>
                    </div>
                </div>

            </div>
        </>

    )
}

export default ViewEvents;