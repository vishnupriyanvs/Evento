import React, { useEffect, useState } from "react";
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faCalendar, faPowerOff, faImage, faUser, faUserCircle, faInbox } from '@fortawesome/free-solid-svg-icons'
import SearchBars from "./search-bar";
import SizedBox from "../sized-box";
import CreateEvent from "../create-event-btn";
import { useParams, useNavigate } from 'react-router-dom';
import apiHandler from '../../api-handling';
import tokenHandler from '../../api-handling/tokenHandler';
import decryptData from "../../client-side-encryption/decrypt";



function Navbar(props) {
    const { id } = useParams()
    const navigateMyEvents = useNavigate()
    const box = document.querySelector('.popup-box');
    const role = decryptData(sessionStorage.getItem('myRole'));
    const [users, setUsers] = useState({})
    //console.log('params id' + id)
    useEffect(async () => {
        try {
            try {
                const x = await apiHandler('get', `users/${id}`)
                console.log(x.data);
                setUsers(x.data)
            }
            catch (err) {
                const x = await tokenHandler('get', `users/${id}`, sessionStorage.getItem('refreshToken'), apiHandler)
                //console.log(x.data);
                setUsers(x.data)
            }
        }
        catch (err) {
            navigateMyEvents("/")
        }

    }, [])

    function logOut() {
        sessionStorage.clear();
        navigateMyEvents("/")
    }


    return (
        <div>
            <div className="mainFlex">

                <div className="flexLeftItem">
                    <SizedBox width="24px" />
                    {/* <FontAwesomeIcon icon={faBars} size="2x" onClick={props.openMenu} color="#91A4B7" /> */}
                </div>

                <div className="flexRightItem">
                    <SearchBars />
                    <SizedBox width="8vh" />
                    {role === '1' ? <CreateEvent onClick={props.onClick} id={id} /> : null}
                    <SizedBox width="8vh" />
                    {/* <FontAwesomeIcon icon={faUserCircle} size="2x" color="#91A4B7" onClick={() => { getComputedStyle(box).visibility === 'hidden' ? box.setAttribute('style', 'visibility: visible;') : box.setAttribute('style', 'visibility: hidden;') }} className="click" /> */}
                    <img src={`http://localhost:4000/images/profile/user/${id}`} alt='userimage' onClick={() => { getComputedStyle(box).visibility === 'hidden' ? box.setAttribute('style', 'visibility: visible;') : box.setAttribute('style', 'visibility: hidden;') }} className="click" />
                    <div className="popup-box_profile">
                        <div className="popup-box">
                            <div className="div-li-image">{id ? <img className="profile-image" src={`http://localhost:4000/images/profile/user/${id}`} /> : <FontAwesomeIcon icon={faUser} size="3x" />}
                                <div>{users.name}</div>
                                <div>{users.email}</div>
                            </div>
                            {/* <div className="div-li"><span>User</span> : <span>Full Name</span></div> */}
                            {/* <div className="div-li">Sign Out</div> */}

                            <div className="div-li"><FontAwesomeIcon id="logout" icon={faPowerOff} size="2x" onClick={logOut} /></div>
                            <div className="sizedBox" />

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Navbar;