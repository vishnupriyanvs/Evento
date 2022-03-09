import React, { useState, useEffect } from "react";
import SizedBox from "../../../../components/sized-box";
import './index.css';
import { useNavigate, Link } from "react-router-dom";
import MyEventsTable from "../../../../components/my-events-table";
import services from "../../../../constants";
import axios from 'axios';
import apiHandler from '../../../../api-handling';
import { useParams } from 'react-router-dom';
import tokenHandler from "../../../../api-handling/tokenHandler";



function InvitedEvents(props) {
  const { id } = useParams()
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);



  // useEffect(() => {
  //     axios
  //         .get(`http://localhost:4000/invitations/response/Active/NotResponded/${id}`)
  //         .then(response => {

  //             setEvents(response.data)

  //         })
  //         .catch((err) => {
  //             console.log(err)
  //         })
  // }, [])




  useEffect(async () => {
    try {
      try {
        const x = await apiHandler('get', `invitations/response/Active/NotResponded/${id}`);
        //console.log(x.data);
        setEvents(x.data);
      } catch (error) {
        const x = await tokenHandler('get', `invitations/response/Active/NotResponded/${id}`, sessionStorage.getItem('refreshToken'), apiHandler);
        setEvents(x.data);
      }
    }
    catch {
      navigate('/');
    }
  }, [])


  const handleSubmit = async (event) => {
    console.log(event.target.id)
    console.log(events)
    const value = event.target.value;
    const eventid = event.target.id;
    // axios   
    //      .put(`http://localhost:4000/invitations/${events[0].id}`,{
    //          invitationResponse:value
    //      })
    //      .then(response => {
    //          setEvents(response.data)
    //      })
    //      .catch(error => {
    //          console.log(error)
    //      })




    try {
      try {
        const x = await apiHandler('put', `invitations/${eventid}`, { invitationResponse: value })
        console.log(x.data);
      } catch (error) {
        const x = await apiHandler('put', `invitations/${eventid}`, { invitationResponse: value }, sessionStorage.getItem('refreshToken'), apiHandler)
        //console.log(x.data);
      }
    }
    catch {
      navigate('/');
    }
    window.location.reload(false);
  }

  // useEffect(() => {
  //     checkFilter.forEach((data) => {
  //         events.filter((content) => { return delete content[data] })
  //     })
  // }, [events])

  // const viewEventDetails = (() => {
  //     events.map((event) => {
  //         onClick = {() => navigate(`../view-event/${id}/${event.id}`)} 
  //     })
  // })




  // {staffs.map((staff) => (
  //     <span key={staff.StaffID}>
  //       <Staff details={staff} />
  //     </span>
  //   ))}


  return (
    <>
      <div className="upcomingEventsTable">
        <SizedBox height="2vh" />
        <MyEventsTable
          titles={['Event-Titles', 'Start Date', 'End Date', 'Status', 'Actions']}
          events={events}
          handleSubmit={handleSubmit}
          // onClick={navigateToEvent(events.id)}
          // onClick = {() => navigate(`../view-event/${id}/${events.id}`)}
          // onClick ={mapping}
          myEventType={services.myEventType.UPCOMING_EVENT.INVITED_EVENT}
        />
      </div>
    </>
  )
}

export default InvitedEvents;