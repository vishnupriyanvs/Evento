import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css";
import { faUserPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import services from "../../services";
import { useNavigate } from "react-router-dom";

function EventsTable(props) {
  // console.log(props.events)
  const navigate = useNavigate();
  const [tHeader, setTHeader] = useState([]);
  const [tRow, setTrow] = useState([]);

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

  //console.log(tRow)

  // const choose(itemTitle){

  // }

  // return (
  //     <center>
  //         <table id="events">
  //             <tbody>
  //                 <tr>
  //                     {tHeader.map((item, i) =>

  //                         <th key={i}>{tHeader[i]}</th>
  //                     )}
  //                 </tr>
  //                 {tRow.map((item, i) => {
  //                    //console.log('hi' )
  //                     const action = tHeader.includes('Actions');
  //                     console.log(action)
  //                     return (
  //                         <tr key={i}>
  //                             {Object.entries(item).map((itemTitle, key) =>
  //                                 // {choose(itemTitle)}
  //                                 <td key={key} onClick={props.onClick}>{itemTitle[1]}</td>
  //                             )}
  //                             {action && <td>
  //                                 <FontAwesomeIcon icon={faUserPlus} />
  //                                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  //                                 <FontAwesomeIcon icon={faEdit} />
  //                             </td>}

  //                         </tr>
  //                     )
  //                 }

  //                 )}
  //             </tbody>
  //         </table>
  //     </center>

  // )

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
            //console.log('hi' )
            const action = tHeader.includes("Actions");
            //console.log(action)
            return (
              <tr key={i}>
                {Object.entries(item).map((itemTitle, key) => {
                  const [element, value] = itemTitle;
                  {
                    console.log(element, value);
                  }
                  if (element !== "id") {
                    if (element == "title") {
                      return (
                        <>
                          <td onClick={() => navigate(`#`)}>{value}</td>
                        </>
                      );
                    }
                    if (element == "start_date" || element == "end_date" ) {
                      return (
                        <>
                          <td>{value.split("T")[0]}</td>
                        </>
                      );
                    }
                    if (element == "is_active") {
                      if (value == "Active") {
                        return (
                          <>
                            <td>
                              <select>
                                <option value="" selected disabled hidden>
                                  {value}
                                </option>
                                <option value="InProgress">InProgress</option>
                                <option value="Completed">Completed</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            {action && <td>
                                 <FontAwesomeIcon icon={faUserPlus}/>
                                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                 <FontAwesomeIcon icon={faEdit} />
                             </td>}
                          </>
                        );
                      } 
                      else{
                          return(
                              <>
                                <td>{value}</td>
                              </>
                          )
                      }
                    }
                  }
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </center>
  );
}

export default EventsTable;
