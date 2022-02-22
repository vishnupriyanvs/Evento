<<<<<<< HEAD
import "./index.css";
import { useState, useEffect, React } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
=======
import './index.css'
import { useState, useEffect, React } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
>>>>>>> 90a9d2b2ebbda7e0677833f0bc0967a978adbe6e
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faEdit,
  faClock,
  faUserAlt,
  faGlobe,
  faPhone,
  faUsers,
  faUserCheck,
} from "@fortawesome/free-solid-svg-icons";
import apiHandler from "../../api-handling";
import tokenHandler from "../../api-handling/tokenHandler";

function ViewEvents() {
  const navigate = useNavigate();
  const [events, setEvents] = useState({});
  const [users, setUsers] = useState([]);
  const [participants, setParticipants] = useState(0);
  const [participantResponse, setParticipantRespponse] = useState([]);
  const [invitees, setInvitees] = useState([]);
  const [cancellationReason, setCancellationReason] = useState([]);
  const { id, eventid } = useParams();

<<<<<<< HEAD
  useEffect(async () => {
    try {
      try {
        const x = await apiHandler("get", `events/${eventid}`);
        setEvents(x.data);
        infoParticipants(eventid);
      } catch (error) {
        const x = await tokenHandler(
          "get",
          `events/${eventid}`,
          sessionStorage.getItem("refreshToken"),
          apiHandler
        );
        setEvents(x.data);
        infoParticipants(eventid);
      }
    } catch {
      navigate("/");
    }
  }, []);

  useEffect(async () => {
    try {
      try {
        const x = await apiHandler("get", `users/${events.contact_person}`);
        setUsers(x.data);
      } catch (error) {
        const x = await tokenHandler(
          "get",
          `users/${events.contact_person}`,
          sessionStorage.getItem("refreshToken"),
          apiHandler
        );
        setUsers(x.data);
      }
    } catch {
      navigate("/");
=======
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
            setFeedbackState([...feedbackState, x.data]);
        })


        invites = response.data.filter((item, i) => { if (item.invitationResponse === 'No') return item })
        setCancellationReason(invites);
        setParticipantRespponse(participantResponse)
    }
    let action = false;
    if (events.isActive == 'Active') {
        action = true;
>>>>>>> 90a9d2b2ebbda7e0677833f0bc0967a978adbe6e
    }
  }, [events]);

  const infoParticipants = async (eventid) => {
    const response = await apiHandler("get", `invitations/event/${eventid}`);
    setParticipants(response.data.length);
    response.data.forEach((item, i) => {
      participantResponse.push({
        name: item.user.name,
        response: item.invitationResponse,
      });
      participantResponse.push({
        id: item.id,
        name: item.user.name,
        response: item.invitationResponse,
      });
    });
    let invites = response.data;
    invites = invites.filter((item, i) => {
      if (item.invitationResponse === "Yes") return item;
    });
    setInvitees(invites);
    invites = response.data.filter((item, i) => {
      if (item.invitationResponse === "No") return item;
    });
    setCancellationReason(invites);
    setParticipantRespponse(participantResponse);
  };

<<<<<<< HEAD
  let action = false;
  if (events.isActive == "Active") {
    action = true;
  }
=======
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
                                <div><FontAwesomeIcon icon={faPhone} /> &nbsp;&nbsp;{users.name}</div>
                                <div>{users.email}</div>
                                <div>{users.contact}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="next-half">
                    <div className='event-invitees-participants'>
                        <div className='event-invitees'>
                            <div><FontAwesomeIcon icon={faUsers} size={"4x"} /></div>
                            <div>
                                <b>Invitees</b>
                                <h1>{participants}</h1>
                            </div>
                        </div>

                        <div className='event-participants'>
                            <div><FontAwesomeIcon icon={faUserCheck} size={"4x"} /></div>
                            <div>
                                <b>Participants</b>
                                <h1>{invitees.length}</h1>
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

                                    cancellationReason.forEach((content, key) => {
                                        if (content.id === item.id) item['reason'] = content['invitationCancelReason']
                                    })

                                    feedbackState.forEach((content, key)=>{
                                        if(content.invitationId === item.id && content.id !== item.id) item['feedback'] = content['feedback']
                                    })
                                    return (
                                        <div className='flex-tr'>
                                            <div className='flex-td'>{item.name}</div>
                                            <div className='flex-td'>{item.response}{item.reason ? <span className='tooltips'>{item.reason}</span> : item.feedback ? <span className='tooltips arrow-left'>{item.feedback}</span>:null}</div>
                                        </div>
                                    )
                                }
                                )
                            }
                        </div>
                    </div>
>>>>>>> 90a9d2b2ebbda7e0677833f0bc0967a978adbe6e

  return (
    <>
      <div className="cards-container">
        <div className="cards">
          <img src={`http://localhost:4000/images/download/${eventid}`} />
          <div className="contentss">
            <div className="event-content">
              {action && (
                <div>
                  <FontAwesomeIcon
                    icon={faUserPlus}
                    onClick={() =>
                      navigate(`/user/sendinvitations/${id}/${eventid}`)
                    }
                  />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <FontAwesomeIcon
                    icon={faEdit}
                    onClick={() =>
                      navigate(`/user/edit-event/${id}/${eventid}`)
                    }
                  />
                </div>
              )}
              <div className="content-event-title">{events.title}</div>
              <div className="content-event-description">
                {events.description}
              </div>
            </div>

            <div className="event-fixture">
              <div className="content-event-date">
                <FontAwesomeIcon icon={faClock} />{" "}
                <span>
                  {events.startDate} : {events.endDate}
                </span>
                <div className="content-event-venue">
                  <a href="#">{events.venue}</a>
                </div>
              </div>

              <div className="content-event-contact-person">
                <FontAwesomeIcon icon={faUserAlt} />
                <span>{events.resourcePerson}</span>
              </div>
            </div>

            <div className="content-event-further-info">
              <div className="flex-left">
                <div>
                  <FontAwesomeIcon icon={faGlobe} />
                  &nbsp;&nbsp;&nbsp;
                  {events.website ? events.website : "www.no-website.com"}
                </div>
              </div>
              <div className="flex-right">
                <div className="flex-side-left">
                  <FontAwesomeIcon icon={faPhone} />
                </div>
                <div className="flex-side-right">
                  <div>{users.name}</div>
                  <div>{users.email}</div>
                  <div>{users.contact}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="event-invitees-participants">
          <div className="event-invitees">
            <div>
              <FontAwesomeIcon icon={faUsers} size={"4x"} />
            </div>
            <div>
              <b>Invitees</b>
              <h1>{participants}</h1>
            </div>
          </div>

          <div className="event-participants">
            <div>
              <FontAwesomeIcon icon={faUserCheck} size={"4x"} />
            </div>
            <div>
              <b>Participants</b>
              <h1>{invitees.length}</h1>
            </div>
          </div>
        </div>

        <div className="event-invitee-response">
          <div className="flex-table">
            <div className="flex-th">
              <div className="flex-th-content">Invitees</div>
              <div className="flex-th-content">Response</div>
            </div>

            {participantResponse.map((item, i) => {
              cancellationReason.forEach((content, key) => {
                if (content.id === item.id)
                  item["reason"] = content["invitationCancelReason"];
              });

              return (
                <div className="flex-tr">
                  <div className="flex-td">{item.name}</div>
                  <div className="flex-td">
                    {item.response}
                    {item.reason ? (
                      <span className="tooltips">{item.reason}</span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewEvents;
