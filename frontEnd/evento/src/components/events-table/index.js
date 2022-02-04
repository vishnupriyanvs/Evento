import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './index.css';
import { faUserPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import services from "../../services";

function EventsTable(props) {
    // console.log(props.events)
    const [tHeader, setTHeader] = useState([]);
    const [tRow, setTrow] = useState([]);
    const checkPage = (page, tHeader, tRow) => {
        switch (page) {
            case services.eventType.UPCOMING_EVENT:

                tHeader = tHeader.filter((title, i) => { return title !== 'End Date' });
                setTHeader(tHeader);
               
                tRow = tRow.filter((content, i) => { return delete content["end_date"] })
                setTrow(tRow);
                break;

            case services.eventType.COMPLETED_EVENT :

                tHeader = tHeader.filter((title, i) => { return title !== 'Actions' });
                setTHeader(tHeader);
                tRow = tRow.filter((content, i) => { return delete content["Actions"] })
                setTrow(tRow);
                break;

            case services.eventType.ONGOING_EVENT :

                tHeader = tHeader.filter((title, i) => { return title !== 'Actions' });
                setTHeader(tHeader);
                tRow = tRow.filter((content, i) => { return delete content["Actions"] })
                setTrow(tRow);
                break;

            case services.eventType.CANCELED_EVENT:
                tHeader = tHeader.filter((title, i) => { return title !== 'End Date' });
                tHeader = tHeader.filter((title, i) => { return title !== 'Actions' });
                setTHeader(tHeader);
                tRow = tRow.filter((content, i) => { return delete content["end_date"] })
                tRow = tRow.filter((content, i) => { return delete content["Actions"] })
                setTrow(tRow);
                break;
            
            default:
                console.log("Nothing Selected")
        }


    }

    useEffect(() => {
        if (props.titles)
            setTHeader(props.titles);
        checkPage(props.eventType, props.titles, props.events);
        if (props.content)
            setTrow(props.content);


    }, [props.titles, props.content])

    //console.log(tRow)
    return (
        <center>
            <table id="events">
                <tbody>
                    <tr>
                        {tHeader.map((item, i) =>

                            <th key={i}>{tHeader[i]}</th>
                        )}
                    </tr>
                    {tRow.map((item, i) =>
                        <tr key={i}>
                            {Object.entries(item).map((itemTitle, key) =>
                                itemTitle[0] !== 'is_active' ?
                                    itemTitle[1] !== 'Actions' ?
                                        <td key={key} onClick={props.onClick}>HI {itemTitle[1]}</td>                   
                                    :
                                        <td>
                                            <FontAwesomeIcon icon={faUserPlus} />
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            <FontAwesomeIcon icon={faEdit} />
                                        </td>
                                    :
                                    <td>
                                        <select className="box">
                                            <option value="" selected disabled hidden>HELLO {itemTitle[1]}</option>
                                            <option value="Active">Active</option>
                                            <option value="In Progress">In Progress</option>
                                        </select>
                                    </td>
                                // <td>{itemTitle[1]}</td>
                            )}
                        </tr>
                    )}
                </tbody>
            </table>
        </center>

    )
}

export default EventsTable;