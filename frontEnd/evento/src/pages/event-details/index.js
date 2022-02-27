import './index1.css'
import { useState, useEffect, React } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faEdit, faClock, faUserAlt, faGlobe, faPhone, faUsers, faUserCheck, faUser, faMailBulk, faCalendar } from "@fortawesome/free-solid-svg-icons";
import apiHandler from '../../api-handling';
import tokenHandler from '../../api-handling/tokenHandler';

import { Image,Card,Descriptions, Table} from 'antd';
// import {PieChart} from 'react-easy-chart'


function ViewEvents() {

    const {Meta} = Card;

    const navigate = useNavigate();
    const [events, setEvents] = useState({});
    const [users, setUsers] = useState([]);
    const [participants, setParticipants] = useState(0)
    const [participantResponse, setParticipantRespponse] = useState([]);
    const [columnData, setColumndata] = useState([]);
    const [invitees, setInvitees] = useState([]);
    const [feedbackState, setFeedbackState] = useState([])
    const [cancellationReason, setCancellationReason] = useState([]);
    const { id, eventid } = useParams();
    let newColumnData = []
    let feedbacks = []

    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
        },
        {
          title: 'Response',
          dataIndex: 'response',
        },
        {
            title : 'Cancel Reason',
            dataIndex : 'cancelReason'
        },
        {
            title: 'Feedback',
            dataIndex: 'feedback',
          },
      ];

    

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
        //console.log(participants)
        // console.log(response.data)
        response.data.map((item, i) => {
            participantResponse.push({ "id": item.id, "name": item.user.name, "response": item.invitationResponse , 'cancelReason' : item.invitationCancelReason});
        })
        // console.log(participantResponse)
        // console.log(response.data)
        // setColumndata(response.data)
        
        let invites = response.data;
        // console.log(invites)
        invites = invites.filter((item, i) => { if (item.invitationResponse == 'Yes'){
            // console.log(item)
            return item
        }})
        



        // console.log(invites)
        setInvitees(invites);
        //console.log(invitees)
        // console.log('helo')
        invites.forEach(async (item, i) => {
            const x = await apiHandler('get', `feedbacks/${item.id}`);
            // console.log(x.data)
            feedbacks.push(x.data)
            //console.log(x.data)
            // console.log(feedbacks)
           // setFeedbackState([...feedbackState, x.data]);
            //console.log(feedbackState)
        })


        
    
     
       console.log(feedbacks)
        setFeedbackState(feedbacks)
        // console.log(feedbackState)

        //console.log(participantResponse)
        // console.log(participantResponse)
        // console.log(feedbackState)

    
        feedbackState.forEach((item,i) => {
            
            participantResponse.forEach((content,key)=>{
                
                if(item.invitationId === content.id){
                    // console.log('hi')
                    newColumnData.push({ "id": content.id, "name" : content.name , "response": content.response , 'cancelReason' : content.cancelReason, 'feedback' : item.feedback});
                }
            })
        })



        console.log(newColumnData)
        // setColumndata(newColumnData)
        // console.log(columnData)

        invites = response.data.filter((item, i) => { if (item.invitationResponse === 'No') return item })
        setCancellationReason(invites);
        setParticipantRespponse(participantResponse)
    }


    useEffect(() => {
        setColumndata(newColumnData)
    },[feedbackState,participantResponse])

    console.log(newColumnData)

    let action = false;
    if (events.isActive == 'Active') {
        action = true;
    }

    //console.log(participantResponse)

    // useEffect(() => {
    //     setColumndata(participants)
    // },[participants])
    // console.log(columnData)


    // const data = [
    //     {
    //       key: '1',
    //       name: 'John Brown',
    //       age: 32,
    //       address: 'New York No. 1 Lake Park',
    //     }]

    return (
        <>
            {/* <div className="cards-container">
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
                                    <div><FontAwesomeIcon icon={faGlobe} />&nbsp;&nbsp;&nbsp;{events.website ? events.website : "www.no-website.com"}</div>
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

            </div> */}


<Image src={`http://localhost:4000/images/download/${eventid}`}/>
<Card id='main-card'  title= {events.title}
        
        hoverable
        extra= {
            <>
            <FontAwesomeIcon className='icon-card' icon={faUserPlus} onClick={() => navigate(`/user/sendinvitations/${id}/${eventid}`)} />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <FontAwesomeIcon className='icon-card' icon={faEdit} onClick={() => navigate(`/user/edit-event/${id}/${eventid}`)} />
            </>      
        } 
        style={{}}>
        <Descriptions>
            <Descriptions.Item >{events.description}</Descriptions.Item>
        </Descriptions>
        <Card id='time-card' hoverable>
            <div><FontAwesomeIcon icon={faCalendar} /> &nbsp;&nbsp;<span>{events.startDate} : {events.endDate}</span></div>
        </Card>
        <Card id='date-card' hoverable>
            <div><FontAwesomeIcon icon={faClock} /> &nbsp;&nbsp;<span>{events.startTime} : {events.endTime}</span></div>
        </Card>
        <br/><br/>
        <div className='content-event-venue'><a href="#">{events.venue}</a></div>
        <br/>
        <div className='contact-person'>
            <div><FontAwesomeIcon icon={faUser} /> &nbsp;&nbsp;{users.name}</div>
            <div className='mail'><FontAwesomeIcon icon={faMailBulk} /> &nbsp;&nbsp;<span>{users.email}</span></div>
            <div><FontAwesomeIcon icon={faPhone} /> &nbsp;&nbsp;{users.contact}</div>
        </div>
        <div className='resource-person'>
            <div><FontAwesomeIcon icon={faUserAlt} />&nbsp;&nbsp;&nbsp;<span>{events.resourcePerson}</span></div>
            <div><FontAwesomeIcon icon={faGlobe} />&nbsp;&nbsp;&nbsp;{events.website ? events.website : "www.no-website.com"}</div>
        </div>
             
</Card>










{/* <PieChart
    labels
    data={[
      {key: 'A', value: 100, color: '#aaac84'},
      {key: 'B', value: 200, color: '#dce7c5'},
      {key: 'C', value: 50, color: '#e3a51a'}
    ]}
    styles={{
      '.chart_text': {
        fontSize: '1em',
        fill: '#fff'
      }
    }} 
  /> */}

  <Card id='participant-card' style={{height:'90%'}} >
      <div className='count-left'>
        <div >&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faUserCheck} size={"3x"}/></div>
        <h2><Meta title='Participants'></Meta></h2>
      </div>
      <div>
      <h1 id='participant-id'>{invitees.length}</h1>
      </div>
  </Card>

  <Card id='invitee-card' style={{height:'90%'}} >
      <div className='count-left'>
        <div >&nbsp;&nbsp;&nbsp;&nbsp;<FontAwesomeIcon icon={faUsers} size={"3x"}/></div>
        <h2><Meta title=' Invitations'></Meta></h2>
      </div>
      <div>
      <h1 id='invitee-id'>{participants}</h1>
      </div>
  </Card>
  
  <Table columns={columns} dataSource={columnData} size="middle" />
        </>

    )
}

export default ViewEvents;