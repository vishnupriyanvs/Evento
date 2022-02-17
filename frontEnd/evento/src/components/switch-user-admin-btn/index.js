import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";



function SwitchUserAdminBtn(props) {
    const { id } = useParams()
    const navigateMyEvents = useNavigate()


    return (
        <div className='myEventIcons'><FontAwesomeIcon icon={props.myEvent} size="2x" color="whitesmoke" onClick={() => { navigateMyEvents(`${props.endPoint}${id}`); }} /><span className='myEventText'>{!props.checkAdmin ? "Admin Events" : "My Events"}</span></div>
    )
}

export default SwitchUserAdminBtn;