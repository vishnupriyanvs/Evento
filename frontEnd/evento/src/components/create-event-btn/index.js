import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import CreateEventForm from "../../pages/create-event-form";
import "./index.css";

function CreateEvent(props) {
    
    // useEffect(()=>{
    //     // document.getElementById("create").addEventListener("click", function() {
    //     //     document.getElementById("myModal").style.display = 'none'
    //       }, []);
    // })
    return (
        <div className="create-event-main" >
            <div className="createEventBtn" onClick={props.onClick}>
                <FontAwesomeIcon icon={faPlus} size="2x" />
                <b>Create Event</b>
            </div>

          <div id="myModal" class="modal">

               <CreateEventForm />

            </div>
        </div>
    )
}

export default CreateEvent;