import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import { faUserPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import services from "../../constants";
import { useNavigate, useParams } from "react-router-dom";
import StatusSelectionBtn from "../event-select-btn";

function EventsTable(props) {

  const { id } = useParams()

  const navigate = useNavigate();
  const [tHeader, setTHeader] = useState([]);
  const [tRow, setTrow] = useState([]);
  const [counter, setCounter] = useState(0)
  const [pages, setPages] = useState([]);

  const [eventDetails, setEventDetails] = useState([props.events]);

  const checkPage = (page, tHeader, tRow, i) => {
    switch (page) {
      case services.eventType.ONGOING_EVENT:
        tHeader = tHeader.filter((title, i) => {
          return title !== "Actions";
        });
        setTHeader(tHeader);
        tRow = tRow.filter((content, i) => {
          return delete content["Actions"];
        });
        // setTrow(tRow);
        setTrow(tRow.length > (i + 1) * 10 ? tRow.slice(tRow.length - (i + 1) * 10, tRow.length - (i * 10)).reverse() : tRow.slice(0, tRow.length - (i * 10)).reverse());
        break;
      case services.eventType.UPCOMING_EVENT:
        tHeader = tHeader.filter((title, i) => {
          return title !== "End Date";
        });
        setTHeader(tHeader);

        tRow = tRow.filter((content, i) => {
          return delete content["end_date"];
        });
        // setTrow(tRow);
        setTrow(tRow.length > (i + 1) * 10 ? tRow.slice(tRow.length - (i + 1) * 10, tRow.length - (i * 10)).reverse() : tRow.slice(0, tRow.length - (i * 10)).reverse());
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
        // setTrow(tRow);
        setTrow(tRow.length > (i + 1) * 10 ? tRow.slice(tRow.length - (i + 1) * 10, tRow.length - (i * 10)).reverse() : tRow.slice(0, tRow.length - (i * 10)).reverse())
        break;
      case services.eventType.COMPLETED_EVENT:
        tHeader = tHeader.filter((title, i) => {
          return title !== "Actions";
        });
        setTHeader(tHeader);
        tRow = tRow.filter((content, i) => {
          return delete content["Actions"];
        });
        // setTrow(tRow);
        setTrow(tRow.length > (i + 1) * 10 ? tRow.slice(tRow.length - (i + 1) * 10, tRow.length - (i * 10)).reverse() : tRow.slice(0, tRow.length - (i * 10)).reverse());
        break; 

      default:
        console.log("Nothing Selected");
    }

    if(page === services.eventType.ONGOING_EVENT){
      tHeader = tHeader.filter((title, i) => {
        return title !== "Actions";
      });
      setTHeader(tHeader);
      tRow = tRow.filter((content, i) => {
        return delete content["Actions"];
      });
      // setTrow(tRow);
      setTrow(tRow.length > (i + 1) * 10 ? tRow.slice(tRow.length - (i + 1) * 10, tRow.length - (i * 10)).reverse() : tRow.slice(0, tRow.length - (i * 10)).reverse());
      
    }
  };

  const handlePagination = () => {
    const t = props.events.length;
    const q = Math.floor(t / 10);
    const r = Math.floor(t % 10);
    const p = r !== 0 ? q + 1 : q;

    const pageList = Array.from(Array(p).keys())
    setPages(pageList)
  }


  useEffect(() => {
    if (props.titles) setTHeader(props.titles);
    checkPage(props.eventType, props.titles, props.events, counter);
    // if (props.content) setTrow(props.content);
    handlePagination()


  }, [props.titles, props.content, counter]);




  return (
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
      <div className="pageList-items">
        {counter >= 1 ? <button onClick={() => { setCounter(counter - 1); }} className="previous-btn">Previous</button> : null}
        {pages.map((item, i) => <span onClick={() => setCounter(item)}>{item + 1}</span>)}
        {counter <= (props.events.length % 10 !== 0 ? (Math.floor(props.events.length / 10) + 1) - 1 : Math.floor(props.events.length / 10) - 1) - 1 ? <button onClick={() => { setCounter(counter + 1); }} className="next-btn">Next</button> : null}

      </div>
    </div>
  );
}

export default EventsTable;
