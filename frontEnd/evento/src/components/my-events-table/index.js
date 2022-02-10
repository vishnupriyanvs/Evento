import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import { faUserPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import services from "../../services";
import { useNavigate, useParams } from "react-router-dom";
import StatusSelectionBtn from "../event-select-btn";
import { Button } from "react-bootstrap";

function MyEventsTable(props) {
  // console.log(props.events)

  const { id } = useParams()
  const navigate = useNavigate();
  const [tHeader, setTHeader] = useState([]);
  const [tRow, setTrow] = useState([]);

  const [eventDetails, setEventDetails] = useState([props.events]);

  const checkPage = (page, tHeader, tRow) => {
    switch (page) {
      case services.myEventType.UPCOMING_EVENT.INVITED_EVENT:
        // tHeader = tHeader.filter((title, i) => {
        //   return title !== "End Date";
        // });
        console.log("Hi from upcoming invited")
        setTHeader(tHeader);

        // tRow = tRow.filter((content, i) => {
        //   return delete content["end_date"];
        // });
        setTrow(tRow);
        break;

      case services.myEventType.UPCOMING_EVENT.ACCEPTED_EVENT:
        console.log(services.myEventType.COMPLETED_EVENT.ACCEPTED_EVENT)
        console.log("Hi from upcoming accept")
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
        console.log("Hi from upcoming reject")
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
        console.log("Hi from complete accept")
        setTrow(tRow);
        break;

      case services.myEventType.COMPLETED_EVENT.REJECTED_EVENT:
        console.log("Hi from complete reject")
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
        console.log("Hi from cancel")
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
        console.log(tRow)
        break;

      case services.myEventType.ONGOING_EVENT:
        console.log("Hi from ongoing")
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

 // console.log(props.myEventType)
  useEffect(() => {
    if (props.titles) setTHeader(props.titles);
    checkPage(props.myEventType, props.titles, props.events);
    if (props.content) setTrow(props.content);


  }, [props.titles, props.content]);
  //console.log(props.content)

  return (
    <center>
      <table id="events">
        <tbody>
          <tr>
            {tHeader.map((item, i) => (
              <th key={i}>{tHeader[i]}</th>
            ))}
          </tr>
          {tRow.map((item, i) => {
            //console.log(item.event)
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
                          <Button variant="primary" size="sm" type="submit">Yes</Button>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <Button variant="danger" size="sm" type="submit">No</Button>
                        </td>
                    </>
                    :
                    <>
                      <td> <StatusSelectionBtn options={[item.event.isActive]} given={item.event.isActive} role={"Admin"} index={i} /></td>
                        <td>
                          <Button variant="primary" size="sm" type="submit">Feedback</Button>
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
    </center>
  );
}

export default MyEventsTable;
