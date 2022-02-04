import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import './index.css';
import { faUserPlus, faEdit } from "@fortawesome/free-solid-svg-icons";
import services from "../../services";

function EventsTable(props) {
    //console.log(props)
    const [tHeader, setTHeader] = useState([]);
    const [tRow, setTrow] = useState([
        // {
        //     'Event Title': "React",
        //     'Status': "Active",
        //     'Start Date': "20/12/2021",
        //     'Actions': 'Completed',
        //     'End Date': "20/12/2021"

        // },
        // {
        //     'Event Title': "Angular",
        //     'Status': "Inactive",
        //     'Start Date': "20/01/2021",
        //     'Actions': "Inactive",
        //     'End Date': "20/12/2021"
        // },
        // {
        //     'Event Title': "Vue",
        //     'Status': "Inactive",
        //     'Start Date': "20/01/2021",
        //     'Actions': "Deactivate",
        //     'End Date': "20/12/2021"
        // }
    ]);
    const checkPage = (page, tHeader, tRow) => {
        switch (page) {
            case services.eventType.UPCOMING_EVENT:

                tHeader = tHeader.filter((title, i) => { return title !== 'End Date' });
                setTHeader(tHeader);
                tRow = tRow.filter((content, i) => { return delete content["End Date"] })
                setTrow(props.events);
                break;

            case services.eventType.COMPLETED_EVENT:

                tHeader = tHeader.filter((title, i) => { return title !== 'Actions' });
                setTHeader(tHeader);
                tRow = tRow.filter((content, i) => { return delete content["Actions"] })
                setTrow(props.events);
                break;

            case services.eventType.CANCELED_EVENT:
                tHeader = tHeader.filter((title, i) => { return title !== 'End Date' });
                setTHeader(tHeader);
                tRow = tRow.filter((content, i) => { return delete content["End Date"] })
                setTrow(props.events);
                tHeader = tHeader.filter((title, i) => { return title !== 'Actions' });
                setTHeader(tHeader);
                tRow = tRow.filter((content, i) => { return delete content["Actions"] })
                setTrow(props.events);
                break;
            default:
                console.log("Nothing Selected")
        }


    }

    useEffect(() => {
        if (props.titles)
            setTHeader(props.titles);
        checkPage(props.eventType, props.titles, tRow);
        if (props.content)
            setTrow(props.content);


    }, [props.titles, props.content])

    console.log(tRow)
    return (
        <center>
            <table id="events">
                <tbody>
                    <tr>
                        {tHeader.map((item, i) =>

                            <th key={i}>{tHeader[i]}</th>
                        )}
                    </tr>
                    {tRow.map((item, i) => {
                        const action = tHeader.includes('Actions');
                        console.log(action)
                        return (
                            <tr key={i}>
                                {Object.entries(item).map((itemTitle, key) =>
                                    <td key={key} onClick={props.onClick}>{itemTitle[1]}</td>
                                )}
                                {action && <td>
                                    <FontAwesomeIcon icon={faUserPlus} />
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <FontAwesomeIcon icon={faEdit} />
                                </td>}

                            </tr>
                        )
                    }
                   
                    )}
                </tbody>
            </table>
        </center>

    )
}

export default EventsTable;