import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import { faUserPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import StatusSelectionBtn from "../event-select-btn";
import { useEventTable } from "./useEventsTable";
import UpdateEventModal from "../../pages/update-event-modal";
import { InviteUser } from "../../pages/send-invitations";

function EventsTable(props) {

  const { id } = useParams()
  const [eventState, setEventState] = useState(null);
  const [eventTitle, setEventTitle] = useState(null);
  const navigate = useNavigate();
  const { tHeader, tRow, counter, incrementCounter, decrementCounter, setCounter, handlePagination, pages, handleTable } = useEventTable()


  useEffect(async () => {
    await handleTable(props.eventType, props.titles, props.events, counter);
    handlePagination(props.events.length);
  }, [props.titles, counter, eventState]);




  return (
    <div>
      <div className="center-elements">
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
                  <td onClick={() => navigate(`/user/view-event/${id}/${item.id}`)}><img src={`http://localhost:4000/images/download/${item.id}`} className="tile-image" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.title}</td>
                  <td>{item.start_date}</td>
                  {item.is_active == 'Active' || item.is_active == 'Cancelled' ?
                    action ?
                      <>
                        <td>
                          <StatusSelectionBtn options={["InProgress", "Completed", "Cancelled", "Active"]} given={item.is_active} role={"Admin"} index={i} eventid={item.id} reason={item.cancellation_reason} eventType={props.eventType} />
                        </td>
                        <td>
                          {/* navigate(`/user/sendinvitations/${id}/${item.id}`) */}
                          <div className="add-box">
                            <FontAwesomeIcon icon={faUserPlus} onClick={() => { setEventState(item.id); setEventTitle(item.title); var modal = document.getElementById("myInvitationModal"); modal.style.display = "flex"; }} className='hover-edit' /><div className='hover-icon'>Add participants</div>
                            <InviteUser id={id} eventid={eventState} title={eventTitle} />
                          </div>
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <div className='edit-box'>
                            <FontAwesomeIcon icon={faEdit} onClick={() => { setEventState(item.id); var modal = document.getElementById("myUpdateModal"); modal.style.display = "block"; }} className='hover-edit' /><div className='hover-icon'>Edit Event</div>
                            <UpdateEventModal eventid={eventState} />
                          </div>
                        </td>
                      </>
                      :
                      <td> <StatusSelectionBtn options={[item.is_active]} given={item.is_active} role={"Admin"} index={i} eventType={props.eventType} /></td>
                    :
                    item.is_active == 'InProgress' ?
                      <>
                        <td>{item.end_date}</td>
                        <td> <StatusSelectionBtn options={["InProgress", "Completed", "Cancelled", "Active"]} given={item.is_active} role={"Admin"} index={i} eventid={item.id} reason={item.cancellation_reason} eventType={props.eventType} /></td>
                      </>
                      :
                      <>
                        <td>{item.end_date}</td>
                        <td> <StatusSelectionBtn options={[item.is_active]} given={item.is_active} role={"Admin"} index={i} /></td>
                      </>

                  }

                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <div className="main-box">
        <div className="pageList-items">

          {counter >= 1 ? <button onClick={() => { decrementCounter() }} className="previous-btn">Previous</button> : null}
          {pages.map((item, i) => <span onClick={() => setCounter(item)}>{item + 1}</span>)}
          {counter <= (props.events.length % 10 !== 0 ? (Math.floor(props.events.length / 10) + 1) - 1 : Math.floor(props.events.length / 10) - 1) - 1 ? <button onClick={() => { incrementCounter(); }} className="next-btn">Next</button> : null}
        </div>
      </div>
    </div>
  );
}

export default EventsTable;