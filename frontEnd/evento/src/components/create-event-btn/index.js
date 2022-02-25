import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./index.css";
import CreateEventForm from "../../pages/create-event-form";

function CreateEvent(props){

    console.log(props)
    console.log(props.show)

    return(
       <> 
        <div className="createEventBtn" onClick={props.onClick}>
            <FontAwesomeIcon icon={faPlus} size="1x" />
            <b>Create Event</b>
        </div>
        {
            props.show ? 
                <CreateEventForm show={props.show}/>
            :
            null
        }
        </>
    )
}

export default CreateEvent;