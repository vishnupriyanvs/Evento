import React from "react";
import SizedBox from "../sized-box";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faEdit, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import './index.css';


function EventTile(props) {


    return (
        <div className="eventTileBody" onClick={props.Click}>
            <div className="eventTitle">
                <SizedBox width="1rem" />
               <b>
                    EVENT TITLE
                </b>
            </div>
            <SizedBox width="40vh" height="10vh" />
            <div className="eventOp">
                <FontAwesomeIcon icon={faPlus} size="2x" />
                <FontAwesomeIcon icon={faEdit} size="2x" />
                <FontAwesomeIcon icon={faWindowClose} size="2x" />
                <SizedBox width="1rem" />
            </div>

        </div>
    )
}

export default EventTile;