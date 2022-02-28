import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import { faUserPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import services from "../../constants";
import { useNavigate, useParams } from "react-router-dom";
import StatusSelectionBtn from "../event-select-btn";
import { Button } from "react-bootstrap";
import Feedback from "../feedback"
import axios from "axios"
import Cancellation from "../cancellation-reason";
import apiHandler from '../../api-handling';
import tokenHandler from "../../api-handling/tokenHandler";
import { useMyEventsTable } from "./useMyEventsTable";

function MyEventsTable(props) {


  const { id } = useParams()
  const navigate = useNavigate();
  // const [tHeader, setTHeader] = useState([]);
  // const [tRow, setTrow] = useState([]);
  const [invitationArray, setInvitationArray] = useState([]);
  // const [counter, setCounter] = useState(0);
  // const [pages, setPages] = useState([]);
  const [eventDetails, setEventDetails] = useState([props.events]);
  const { tHeader, tRow, counter, incrementCounter, decrementCounter, setCounter, handlePagination, pages, handleTable } = useMyEventsTable()
  const eventInfo = props.events;

  // const checkPage = (page, tHeader, tRow, i) => {
  //   switch (page) {
  //     case services.myEventType.UPCOMING_EVENT.INVITED_EVENT:
  //       // tHeader = tHeader.filter((title, i) => {
  //       //   return title !== "End Date";
  //       // });

  //       setTHeader(tHeader);

  //       // tRow = tRow.filter((content, i) => {
  //       //   return delete content["end_date"];
  //       // });
  //       tRow = tRow.length > (i + 1) * 10 ? tRow.length.slice(tRow.length - (i + 1) * 10, tRow.length - (i * 10)).reverse() : tRow.slice(0, tRow.length - (i * 10)).reverse();
  //       setTrow(tRow);
  //       break;

  //     case services.myEventType.UPCOMING_EVENT.ACCEPTED_EVENT:

  //       tHeader = tHeader.filter((title, i) => {
  //         return title !== "Actions";
  //       });
  //       setTHeader(tHeader);
  //       tRow = tRow.filter((content, i) => {
  //         return delete content["Actions"];
  //       });
  //       tRow = tRow.length > (i + 1) * 10 ? tRow.length.slice(tRow.length - (i + 1) * 10, tRow.length - (i * 10)).reverse() : tRow.slice(0, tRow.length - (i * 10)).reverse();
  //       setTrow(tRow);
  //       break;

  //     case services.myEventType.UPCOMING_EVENT.REJECTED_EVENT:

  //       tHeader = tHeader.filter((title, i) => {
  //         return title !== "Actions";
  //       });
  //       setTHeader(tHeader);
  //       tRow = tRow.filter((content, i) => {
  //         return delete content["Actions"];
  //       });
  //       tRow = tRow.length > (i + 1) * 10 ? tRow.length.slice(tRow.length - (i + 1) * 10, tRow.length - (i * 10)).reverse() : tRow.slice(0, tRow.length - (i * 10)).reverse();
  //       setTrow(tRow);
  //       break;

  //     case services.myEventType.COMPLETED_EVENT.ACCEPTED_EVENT:

  //       setTHeader(tHeader);
  //       tRow = tRow.length > (i + 1) * 10 ? tRow.length.slice(tRow.length - (i + 1) * 10, tRow.length - (i * 10)).reverse() : tRow.slice(0, tRow.length - (i * 10)).reverse();
  //       setTrow(tRow);
  //       break;

  //     case services.myEventType.COMPLETED_EVENT.REJECTED_EVENT:

  //       tHeader = tHeader.filter((title, i) => {
  //         return title !== "Actions";
  //       });
  //       setTHeader(tHeader);
  //       tRow = tRow.filter((content, i) => {
  //         return delete content["Actions"];
  //       });
  //       tRow = tRow.length > (i + 1) * 10 ? tRow.length.slice(tRow.length - (i + 1) * 10, tRow.length - (i * 10)).reverse() : tRow.slice(0, tRow.length - (i * 10)).reverse();
  //       setTrow(tRow);
  //       break;

  //     case services.myEventType.CANCELLED_EVENT:

  //       tHeader = tHeader.filter((title, i) => {
  //         return title !== "Actions";
  //       });
  //       tHeader = tHeader.filter((title, i) => {
  //         return title !== "End Date";
  //       });
  //       setTHeader(tHeader);
  //       tRow = tRow.filter((content, i) => {
  //         return delete content.event["endDate"];
  //       });
  //       tRow = tRow.filter((content, i) => {
  //         return delete content["Actions"];
  //       });
  //       tRow = tRow.length > (i + 1) * 10 ? tRow.length.slice(tRow.length - (i + 1) * 10, tRow.length - (i * 10)).reverse() : tRow.slice(0, tRow.length - (i * 10)).reverse();
  //       setTrow(tRow);

  //       break;

  //     case services.myEventType.ONGOING_EVENT:

  //       tHeader = tHeader.filter((title, i) => {
  //         return title !== "Actions";
  //       });
  //       setTHeader(tHeader);
  //       tRow = tRow.filter((content, i) => {
  //         return delete content["Actions"];
  //       });
  //       tRow = tRow.length > (i + 1) * 10 ? tRow.length.slice(tRow.length - (i + 1) * 10, tRow.length - (i * 10)).reverse() : tRow.slice(0, tRow.length - (i * 10)).reverse();
  //       setTrow(tRow);
  //       break;
  //     default:
  //       console.log("Nothing Selected");
  //   }
  // };


  useEffect(async() => {
    // if (props.titles) setTHeader(props.titles);
    await handleTable(props.myEventType, props.titles, props.events, counter);
    handlePagination(props.events.length)
    // if (props.events) setTrow(props.events);


  }, [props.titles, props.content, counter]);

  useEffect(async () => {
    const arr = [];
    try {
      try {
        const response = await apiHandler('get', `feedbacks`)
        response.data.forEach(item => {
          arr.push(item.invitationId);
        })
      }
      catch (err) {
        const response = await tokenHandler('get', `feedbacks`, sessionStorage.getItem('refreshToken'), apiHandler)
        response.data.forEach(item => {
          arr.push(item.invitationId);
        })
      }
    }
    catch (err) {
      navigate("/")
    }

    //console.log(x.data);

    setInvitationArray(arr);
    // axios
    //     .get(`http://localhost:4000/feedbacks`)
    //     .then(response => {
    //         response.data.forEach(item => {
    //           arr.push(item.invitationId);
    //         })
    //         setInvitationArray(arr);
    //     })
    //     .catch(err =>{

    //     })


  }, [])


  // const handlePagination = (eventsCount) => {
  //   const t = eventsCount;
  //   const q = Math.floor(t / 10);
  //   const r = Math.floor(t % 10);
  //   const p = r !== 0 ? q + 1 : q;

  //   const pageList = Array.from(Array(p).keys())
  //   setPages(pageList)
  // }


  return (
    <div>
      <div className="center-elements">
        {props.events.length == 0 ? <h1>You have no Events</h1> :
          <table id="events">
            <tbody>
              <tr>
                {tHeader.map((item, i) => (
                  <th key={i}>{tHeader[i]}</th>
                ))}
              </tr>
              {tRow.map((item, i) => {

                const action = tHeader.includes("Actions");
                return (
                  <tr>
                    <td onClick={() => navigate(`/user/view-event/${id}/${item.event.id}`)}><img src={`http://localhost:4000/images/download/${item.id}`} className="tile-image" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.event.title}</td>
                    <td>{item.event.startDate}</td>
                    {item.event.endDate ?
                      <td>{item.event.endDate}</td>
                      : null
                    }

                    {item.event.isActive == 'Active' || item.event.isActive == 'InProgress' || item.event.isActive == 'Cancelled' || item.event.isActive == 'Completed' ?
                      action ? item.event.isActive == 'Active' ?
                        <>
                          <td> <StatusSelectionBtn options={[item.event.isActive]} given={item.event.isActive} role={"Admin"} index={i} /></td>
                          <td>
                            <div className="responseButton">
                              <Button variant="primary" size="sm" onClick={props.handleSubmit} value="Yes" id={item.id}>Yes</Button>
                              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                              <Cancellation invitationId={item.id} title={item.event.title} id={item.id} />
                            </div>
                          </td>
                        </>
                        :
                        <>
                          <td> <StatusSelectionBtn options={[item.event.isActive]} given={item.event.isActive} role={"Admin"} index={i} /></td>
                          <td>
                            {invitationArray.includes(item.id) ? <Button variant="primary" size="sm" disabled>Feedback</Button> : <Feedback invitationId={item.id} title={item.event.title} />}
                          </td>
                        </>
                        :
                        <td> <StatusSelectionBtn options={[item.event.isActive]} given={item.event.isActive} role={"Admin"} index={i} /></td>
                      :
                      <>

                        <td> <StatusSelectionBtn options={[item.event.isActive]} given={item.event.isActive} role={"Admin"} index={i} /></td>
                      </>
                    }
                  </tr>
                )
              })}
            </tbody>
          </table>
        }
      </div>
      <div className="main-box">
        <div className="pageList-items">

          {counter >= 1 ? <button onClick={() => { decrementCounter()}} className="previous-btn">Previous</button> : null}
          {pages.map((item, i) => <span onClick={() => setCounter(item)}>{item + 1}</span>)}
          {counter <= (props.events.length % 10 !== 0 ? (Math.floor(props.events.length / 10) + 1) - 1 : Math.floor(props.events.length / 10) - 1) - 1 ? <button onClick={() => { incrementCounter();  }} className="next-btn">Next</button> : null}
        </div>
      </div>
    </div>
  );
}

export default MyEventsTable;
