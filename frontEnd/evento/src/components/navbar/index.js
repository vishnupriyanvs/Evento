import React from "react";
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faCalendar, faPowerOff, faImage, faUser, faUserCircle, faInbox } from '@fortawesome/free-solid-svg-icons'
import SearchBars from "./search-bar";
import SizedBox from "../sized-box";
import CreateEvent from "../create-event-btn";
import { useParams, useNavigate } from 'react-router-dom';

function Navbar(props) {
    const { id } = useParams()
    const navigateMyEvents = useNavigate()
    const box = document.querySelector('.popup-box');
    console.log(props)
    const role = sessionStorage.getItem('myRole');
    //console.log('params id' + id)
    return (
        <div>
            <div className="mainFlex">

                <div className="flexLeftItem">
                    <SizedBox width="24px" />
                    <FontAwesomeIcon icon={faBars} size="2x" onClick={props.openMenu} color="#91A4B7" />
                </div>

                <div className="flexRightItem">

                    {/* <FontAwesomeIcon icon={faCalendar} size="2x" onClick={props.onCalenderClick}/> */}

                    {role === '1' ? <div className='myEventIcons'><FontAwesomeIcon icon={props.myEvent} size="2x" color="#91A4B7" onClick={() => navigateMyEvents(`${props.endPoint}${id}`)} /><span className='myEventText'>My Events</span></div> : null}

                    <SearchBars />
                    <SizedBox width="8vh" />
                    {role === '1' ? <CreateEvent onClick={props.onClick} id={id} /> : null}
                    <SizedBox width="8vh" />
                    <FontAwesomeIcon icon={faUserCircle} size="2x" color="#91A4B7" onClick={() => { getComputedStyle(box).visibility === 'hidden' ? box.setAttribute('style', 'visibility: visible;') : box.setAttribute('style', 'visibility: hidden;') }} className="click" />
                    <div className="popup-box_profile">
                        <div className="popup-box">
                            <div className="div-li-image">{id ? <img className="profile-image" src={`http://localhost:4000/images/profile/user/${id}`} /> : <FontAwesomeIcon icon={faUser} size="3x" />}<div>User Name</div></div>
                            <div className="div-li"><span>User</span> : <span>Full Name</span></div>
                            <div className="div-li">Sign Out</div>
                        </div>
                    </div>


                    <div className="sizedBox" />

                </div>
            </div>
        </div >

    )
}

export default Navbar;