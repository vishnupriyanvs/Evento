import React from "react";
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faCalendar, faPowerOff, faImage, faUser, faUserCircle,faInbox } from '@fortawesome/free-solid-svg-icons'
import SearchBars from "./search-bar";
import SizedBox from "../sized-box";
import CreateEvent from "../create-event-btn";
import {useParams,useNavigate} from 'react-router-dom';

function Navbar(props) {
    const {id} = useParams()
    const navigateMyEvents = useNavigate()
    console.log(props)
    const role =sessionStorage.getItem('myRole');
    //console.log('params id' + id)
    return (
        <div>
            <div className="mainFlex">

                <div className="flexLeftItem">
                    <SizedBox width="24px" />
                    <FontAwesomeIcon icon={faBars} size="2x" onClick={props.openMenu} color="#91A4B7"/>   
                </div>

                <div className="flexRightItem">

                    {/* <FontAwesomeIcon icon={faCalendar} size="2x" onClick={props.onCalenderClick}/> */}
                   
                    {role === 1 ? <div className='myEventIcons'><FontAwesomeIcon icon={props.myEvent} size="2x" color="#91A4B7" onClick={() => navigateMyEvents(`${props.endPoint}${id}`)} /><span className='myEventText'>My Events</span></div> : null }
    
                    <SearchBars />
                    <SizedBox width="8vh" />
                    {role === 1 ? <CreateEvent onClick={props.onClick} id={id}/> : null}
                    <SizedBox width="8vh" />
                    <FontAwesomeIcon icon={faImage} size="2x" color="#91A4B7"/>
                    
                    <div className="sizedBox" />

                </div>
            </div>
        </div>

    )
}

export default Navbar;