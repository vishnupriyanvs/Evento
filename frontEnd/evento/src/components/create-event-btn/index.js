import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

function CreateEvent(props){

    

    return(
        
        <div className="createEventBtn" onClick={props.onClick}>
            <FontAwesomeIcon icon={faPlus} size="2x" />
            <b>Create Event</b>
        </div>
    )
}

export default CreateEvent;