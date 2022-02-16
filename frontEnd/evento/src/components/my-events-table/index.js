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

function MyEventsTable(props) {
  

  const { id } = useParams()
  const navigate = useNavigate();
  const [tHeader, setTHeader] = useState([]);
  const [tRow, setTrow] = useState([]);
  const [invitationArray,setInvitationArray] = useState([]);

  const [eventDetails, setEventDetails] = useState([props.events]);
 
  const eventInfo =props.events;
  
  const checkPage = (page, tHeader, tRow) => {
    switch (page) {
      case services.myEventType.UPCOMING_EVENT.INVITED_EVENT:
        // tHeader = tHeader.filter((title, i) => {
        //   return title !== "End Date";
        // });
       
        setTHeader(tHeader);

        // tRow = tRow.filter((content, i) => {
        //   return delete content["end_date"];
        // });
        setTrow(tRow);
        break;

      case services.myEventType.UPCOMING_EVENT.ACCEPTED_EVENT:
       
        tHeader = tHeader.filter((title, i) => {
          return title !== "Actions";
        });
        setTHeader(tHeader);
        tRow = tRow.filter((content, i) => {
          return delete content["Actions"];
        });
        setTrow(tRow);
        break;

      case services.myEventType.UPCOMING_EVENT.REJECTED_EVENT:
        
        tHeader = tHeader.filter((title, i) => {
          return title !== "Actions";
        });
        setTHeader(tHeader);
        tRow = tRow.filter((content, i) => {
          return delete content["Actions"];
        });
        setTrow(tRow);
        break;

      case services.myEventType.COMPLETED_EVENT.ACCEPTED_EVENT:
        
        setTHeader(tHeader);
        
        setTrow(tRow);
        break;

      case services.myEventType.COMPLETED_EVENT.REJECTED_EVENT:
      
        tHeader = tHeader.filter((title, i) => {
          return title !== "Actions";
        });
        setTHeader(tHeader);
        tRow = tRow.filter((content, i) => {
          return delete content["Actions"];
        });
        setTrow(tRow);
        break;

      case services.myEventType.CANCELLED_EVENT:
       
        tHeader = tHeader.filter((title, i) => {
          return title !== "Actions";
        });
        tHeader = tHeader.filter((title, i) => {
          return title !== "End Date";
        });
        setTHeader(tHeader);
        tRow = tRow.filter((content, i) => {
          return delete content.event["endDate"];
        });
        tRow = tRow.filter((content, i) => {
          return delete content["Actions"];
        });
        setTrow(tRow);
        
        break;

      case services.myEventType.ONGOING_EVENT:
       
        tHeader = tHeader.filter((title, i) => {
          return title !== "Actions";
        });
        setTHeader(tHeader);
        tRow = tRow.filter((content, i) => {
          return delete content["Actions"];
        });
        setTrow(tRow);
        break;
      default:
        console.log("Nothing Selected");
    }
  };

 
  useEffect(() => {
    if (props.titles) setTHeader(props.titles);
    checkPage(props.myEventType, props.titles, props.events);
    if (props.content) setTrow(props.content);


  }, [props.titles, props.content]);

  useEffect(() => {
    const arr = [];
    axios
        .get(`http://localhost:4000/feedbacks`)
        .then(response => {
            response.data.forEach(item => {
              arr.push(item.invitationId);
            })
            setInvitationArray(arr);
        })
        .catch(err =>{
            
        })

},[])
  

  return (
    <center>
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
                <td onClick={() => navigate(`/user/view-event/${id}/${item.event.id}`)}>{item.event.title}</td>
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
                          <Button variant="primary" size="sm" onClick={props.handleSubmit} value="Yes" >Yes</Button>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Cancellation invitationId={item.id} title={item.event.title}/>
                        </td>
                    </>
                    :
                    <>
                      <td> <StatusSelectionBtn options={[item.event.isActive]} given={item.event.isActive} role={"Admin"} index={i} /></td>
                        <td>
                          {invitationArray.includes(item.id) ? <Button variant="primary" size="sm" disabled>Feedback</Button> :<Feedback invitationId={item.id} title={item.event.title}/>}
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
    </center>
  );
}

export default MyEventsTable;
