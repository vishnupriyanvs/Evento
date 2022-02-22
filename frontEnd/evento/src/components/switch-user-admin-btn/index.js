import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AdminTitleContext from "../context";



function SwitchUserAdminBtn(props) {
    
    const { id } = useParams()
    const {titles,setTitles} = useContext(AdminTitleContext);
    const navigateMyEvents = useNavigate()

    return (
        <div className='myEventIcons'><FontAwesomeIcon  icon={props.myEvent} size="2x" color="whitesmoke" onClick={() => {  navigateMyEvents(`${props.endPoint}${id}`);setTitles(props.print)}}  /><span className='myEventText'>{!props.checkAdmin ? "Admin Events" : "My Events"}</span></div>
    )
}

export default SwitchUserAdminBtn;