import EditEventForm from "../edit-event-form";
import './index.css';
import Modal  from 'react-modal'
function UpdateEventModal(props) {

    console.log('helo')
console.log(props)

    return (
        <div className="update-event-main">
            <div id="myUpdateModal" class="update-modal">
        {/* <> */}
            {/* <Modal show={props.show} onHide={props.handleClose} animation={false}>
            <Modal.Body>
                {console.log('inside')} */}
                <EditEventForm eventid={props.eventid}/>
                {/* </Modal.Body>
            </Modal>
                </> */}
             </div>
         </div>
    )
}

export default UpdateEventModal