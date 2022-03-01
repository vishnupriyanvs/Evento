import React, { useContext, useEffect, useState } from "react";
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faCalendar, faPowerOff, faImage, faUser, faUserCircle, faInbox, faMask } from '@fortawesome/free-solid-svg-icons'
import SearchBars from "./search-bar";
import SizedBox from "../sized-box";
import CreateEvent from "../create-event-btn";
import { useParams, useNavigate } from 'react-router-dom';
import apiHandler from '../../api-handling';
import tokenHandler from '../../api-handling/tokenHandler';
import decryptData from "../../client-side-encryption/decrypt";
import TitleContext from "../../context/titleContext";
import SwitchUserAdminBtn from '../../components/switch-user-admin-btn';
import encryptData from "../../client-side-encryption/encrypt";
import SwitchContext from "../context/switchuser";
import OutsideAlerter from "./useOutsideClick";



function Navbar(props) {
    const { titles, setTitles } = useContext(TitleContext)
    const { switchUser, setSwitchUser } = useContext(SwitchContext);
    const titleContext = useContext(TitleContext);
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
    function menuToggle() {
        const toggleMenu = document.querySelector('.menu');
        toggleMenu.classList.toggle('active')
    }


    return (
        <div>
            <div className="mainFlex">

                <div className="flexLeftItem">
                    <SizedBox width="24px" />
                    {/* <FontAwesomeIcon icon={faBars} size="2x" onClick={props.openMenu} color="#91A4B7" /> */}
                    <h4>{titleContext.titles}</h4>
                </div>

                <div className="flexRightItem">
                    <SearchBars />
                    <SizedBox width="8vh" />
                    {role === '1' ? <CreateEvent onClick={props.onClick} id={id} /> : null}
                    <SizedBox width="8vh" />
                    {/* <FontAwesomeIcon icon={faUserCircle} size="2x" color="#91A4B7" onClick={() => { getComputedStyle(box).visibility === 'hidden' ? box.setAttribute('style', 'visibility: visible;') : box.setAttribute('style', 'visibility: hidden;') }} className="click" /> */}
                    {/* <img src={`http://localhost:4000/images/profile/user/${id}`} alt='userimage' onClick={() => { getComputedStyle(box).visibility === 'hidden' ? box.setAttribute('style', 'visibility: visible;') : box.setAttribute('style', 'visibility: hidden;') }} className="click" /> */}
                    {/* <div className="popup-box_profile">
                        <div className="popup-box">
                            <div className="div-li-image">{id ? <img className="profile-image" src={`http://localhost:4000/images/profile/user/${id}`} /> : <FontAwesomeIcon icon={faUser} size="3x" />}
                                <div>{users.name}</div>
                                <div>{users.email}</div>
                            </div>
                           

                            <div className="div-li"><FontAwesomeIcon id="logout" icon={faPowerOff} size="2x" onClick={logOut} /></div>
                            <div className="sizedBox" />

                        </div>
                    </div> */}
                    <OutsideAlerter>
                        <img style={{ cursor: "pointer" }} src={`http://localhost:4000/images/profile/user/${id}`} alt='userimage' onClick={menuToggle} className="click" />
                        <div className="action">
                            <div className="profile">

                            </div>
                            <div className="menu">
                                <h3>{users.name}<br></br><span>{users.email}</span></h3>
                                <ul>
                                    {role == 1 ? !switchUser ? <li><SwitchUserAdminBtn myEvent={faInbox} handle={1} checkAdmin={true} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div></div></li> : <li><SwitchUserAdminBtn myEvent={faMask} handle={0} checkAdmin={false} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li> : null}
                                    {/* <li><SwitchUserAdminBtn myEvent={faInbox} handle={'1'} endPoint={'my-events/upcoming-events/invited/'}  checkAdmin={true} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div><span className="profileSpan" onClick={() => {navigateMyEvents(`/user/upcoming-events/${id}`)}}>My Event</span></div></li> */}
                                    {/* <li><SwitchUserAdminBtn myEvent={faMask} handle={'0'} endPoint={'/user/upcoming-events/'}  checkAdmin={true} />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="profileSpan">Admin Event</span></li> */}
                                    <li style={{ cursor: 'pointer' }} onClick={logOut}><FontAwesomeIcon id="logout" icon={faPowerOff} color="whitesmoke" size="1x" />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="profileSpan">Log out</span></li>
                                </ul>
                            </div>
                        </div>
                    </OutsideAlerter>
                </div>
            </div>
        </div>

    )
}

export default Navbar;