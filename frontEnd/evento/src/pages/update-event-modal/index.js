import EditEventForm from "../edit-event-form";
import './index.css';

function UpdateEventModal(props) {



    return (
        <div className="update-event-main">
            <div id="myUpdateModal" class="update-modal">
                <EditEventForm eventid={props.eventid}/>
            </div>
        </div>
    )
}

export default UpdateEventModal