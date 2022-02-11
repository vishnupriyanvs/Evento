import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import { faUserPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import services from "../../services";
import { useNavigate, useParams } from "react-router-dom";
import StatusSelectionBtn from "../event-select-btn";

function EventsTable(props) {
  
  const { id } = useParams()
  
  const navigate = useNavigate();
  const [tHeader, setTHeader] = useState([]);
  const [tRow, setTrow] = useState([]);

  const [eventDetails, setEventDetails] = useState([props.events]);

  const checkPage = (page, tHeader, tRow) => {
    switch (page) {
      case services.eventType.UPCOMING_EVENT:
        tHeader = tHeader.filter((title, i) => {
          return title !== "End Date";
        });
        setTHeader(tHeader);

        tRow = tRow.filter((content, i) => {
          return delete content["end_date"];
        });
        setTrow(tRow);
        break;

      case services.eventType.COMPLETED_EVENT:
        tHeader = tHeader.filter((title, i) => {
          return title !== "Actions";
        });
        setTHeader(tHeader);
        tRow = tRow.filter((content, i) => {
          return delete content["Actions"];
        });
        setTrow(tRow);
        break;

      case services.eventType.ONGOING_EVENT:
        tHeader = tHeader.filter((title, i) => {
          return title !== "Actions";
        });
        setTHeader(tHeader);
        tRow = tRow.filter((content, i) => {
          return delete content["Actions"];
        });
        setTrow(tRow);
        break;

      case services.eventType.CANCELED_EVENT:
        tHeader = tHeader.filter((title, i) => {
          return title !== "End Date";
        });
        tHeader = tHeader.filter((title, i) => {
          return title !== "Actions";
        });
        setTHeader(tHeader);
        tRow = tRow.filter((content, i) => {
          return delete content["end_date"];
        });
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
    checkPage(props.eventType, props.titles, props.events);
    if (props.content) setTrow(props.content);

 
  }, [props.titles, props.content]);

  


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
            
            const action = tHeader.includes("Actions");
            return(
              <tr>
                <td onClick={() => navigate(`/user/view-event/${id}/${item.id}`)}>{item.title}</td>
                <td>{item.start_date}</td>
                  {item.is_active == 'Active' || item.is_active == 'Cancelled' ? 
                    action ? 
                    <>
                      <td>
                        <StatusSelectionBtn options={["InProgress", "Completed", "Cancelled", "Active"]} given={item.is_active} role={"Admin"} index={i} eventid={item.id}/>
                      </td>
                      <td>
                        <FontAwesomeIcon icon={faUserPlus} onClick={() => navigate(`/user/sendinvitations/${id}/${item.id}`)} />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <FontAwesomeIcon icon={faEdit} onClick={() => navigate(`/user/edit-event/${id}/${item.id}`)} />
                      </td>
                    </>
                    :
                    <td> <StatusSelectionBtn options={[item.is_active]} given={item.is_active} role={"Admin"} index={i}/></td>
                    :
                    item.is_active == 'InProgress' ? 
                    <>
                      <td>{item.end_date}</td>
                      <td> <StatusSelectionBtn options={["InProgress", "Completed", "Cancelled", "Active"]} given={item.is_active} role={"Admin"} index={i} eventid={item.id}/></td>
                    </>
                    :
                    <>
                      <td>{item.end_date}</td>
                      <td> <StatusSelectionBtn options={[item.is_active]} given={item.is_active} role={"Admin"} index={i}/></td>
                    </>
                   
            }
                
              </tr>
          )})}
        </tbody>
      </table>
    </center>
  );
}

export default EventsTable;
