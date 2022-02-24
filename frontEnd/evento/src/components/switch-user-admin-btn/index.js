import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import SwitchContext from "../context/switchuser";


function SwitchUserAdminBtn(props) {
    const { id } = useParams()
    const {switchUser,setSwitchUser}= useContext(SwitchContext);
    const navigateMyEvents = useNavigate()
   
    function handleSwitching(){
        if(props.handle){
            setSwitchUser(1)
            console.log(switchUser)
            navigateMyEvents(`my-events/upcoming-events/invited/${id}`)
        }
        if(!props.handle){
            setSwitchUser(0)
            console.log(switchUser)
            navigateMyEvents(`/user/upcoming-events/${id}`)
        }
        // props.handle == 1 ? navigateMyEvents(`${props.endPoint}${id}`)  : navigateMyEvents(`/user/upcoming-events/${id}`)
    }
    return (
        // <div className='myEventIcons'><FontAwesomeIcon icon={props.myEvent} size="2x" color="whitesmoke" onClick={() => { navigateMyEvents(`${props.endPoint}${id}`); }} /><span className='myEventText'>{!props.checkAdmin ? "Admin Events" : "My Events"}</span></div>
        <div style={{cursor:"pointer"}} onClick={() => { handleSwitching() }}><FontAwesomeIcon icon={props.myEvent} size="1x" color="whitesmoke"  />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style={{color:"whitesmoke",fontWeight:"normal",fontFamily:"Poppins, sans-serif"}}>{!props.checkAdmin ? "Admin Events" : "My Events"}</span></div>
    )
}

export default SwitchUserAdminBtn;