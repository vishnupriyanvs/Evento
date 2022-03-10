import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import SwitchContext from "../context/switchuser";
import TitleContext from "../../context/titleContext";


function SwitchUserAdminBtn(props) {
    const { id } = useParams()
    const {switchUser,setSwitchUser}= useContext(SwitchContext);
    const {titles,setTitles} = useContext(TitleContext)
    const titleContext = useContext(TitleContext)
    const navigateMyEvents = useNavigate()
   
    function handleSwitching(){
        if(props.checkAdmin){
            setSwitchUser(1)
            //console.log(switchUser)
            navigateMyEvents(`my-events/upcoming-events/invited/${id}`)
            titleContext.handleTitles('My Events - Upcoming - Invited')
            sessionStorage.setItem('isSwitchAdmin',false)
        }
        if(!props.checkAdmin){
            setSwitchUser(0)
            //console.log(switchUser)
            navigateMyEvents(`/user/upcoming-events/${id}`);
            titleContext.handleTitles('Upcoming Events');
            sessionStorage.setItem('isSwitchAdmin',true);
        }
        // props.handle == 1 ? navigateMyEvents(`${props.endPoint}${id}`)  : navigateMyEvents(`/user/upcoming-events/${id}`)
    }
    return (
        // <div className='myEventIcons'><FontAwesomeIcon icon={props.myEvent} size="2x" color="whitesmoke" onClick={() => { navigateMyEvents(`${props.endPoint}${id}`); }} /><span className='myEventText'>{!props.checkAdmin ? "Admin Events" : "My Events"}</span></div>
        <div style={{cursor:"pointer"}} onClick={() => { handleSwitching() }}>
            <FontAwesomeIcon icon={props.myEvent} size="1x" color="whitesmoke"  />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <span style={{color:"whitesmoke",fontWeight:"normal",fontFamily:"Poppins, sans-serif"}}>
                {!props.checkAdmin ? "Admin Events" : "My Events"}
            </span>
        </div>
    )
}

export default SwitchUserAdminBtn;