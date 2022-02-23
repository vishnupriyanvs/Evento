import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import { faUserPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useParams } from "react-router-dom";
import StatusSelectionBtn from "../event-select-btn";
import { useEventTable } from "./useEventsTable";

function EventsTable(props) {

  const { id } = useParams()

  const navigate = useNavigate();
  const { tHeader, tRow, counter, incrementCounter, decrementCounter, setCounter, handlePagination, pages, handleTable } = useEventTable()


  useEffect(async () => {
    // checkPage(props.eventType, props.titles, props.events, counter);
    await handleTable(props.eventType, props.titles, props.events, counter);
    // console.log(props.events)
    // handleRow(props.eventType, props.titles, props.events, counter);
    handlePagination(props.events.length);


  }, [props.titles, counter]);




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
                  <td onClick={() => navigate(`/user/view-event/${id}/${item.id}`)}>{item.title}</td>
                  <td>{item.start_date}</td>
                  {item.is_active == 'Active' || item.is_active == 'Cancelled' ?
                    action ?
                      <>
                        <td>
                          <StatusSelectionBtn options={["InProgress", "Completed", "Cancelled", "Active"]} given={item.is_active} role={"Admin"} index={i} eventid={item.id} reason={item.cancellation_reason} eventType={props.eventType} />
                        </td>
                        <td>
                          <FontAwesomeIcon icon={faUserPlus} onClick={() => navigate(`/user/sendinvitations/${id}/${item.id}`)} />
                          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                          <FontAwesomeIcon icon={faEdit} onClick={() => navigate(`/user/edit-event/${id}/${item.id}`)} />
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
