import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faFastForward, faCheckCircle, faStopCircle, faAngleDown, faInbox, faMask } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import { Outlet, useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import SwitchUserAdminBtn from '../components/switch-user-admin-btn';
import decryptData from '../client-side-encryption/decrypt';

function MainPage() {
    const { id } = useParams()
    //console.log('from Main page '+id)
    const navigate = useNavigate();
    const role = sessionStorage.getItem('myRole');
    const [dimension, setDimension] = useState({})
    const [sideCheck, setSideCheck] = useState(false);


    useEffect(() => {
        console.log("width");
        // navbarCheck();
        setDimension({
            height: window.innerHeight,
            width: window.innerWidth
        })
    }, [sideCheck]);

    // This function is not required anymore
    const navbarCheck = () => {
        if (document.querySelector('.sidebar').classList.contains('open')) {
            setSideCheck(true);
        } else {
            setSideCheck(false);
        }

    }

    const navigateEvents = (eventype) => {
        navigate(`/user/${eventype}`);
    }

    const clickMenu = () => {
        if (!sideCheck) {
            document.querySelector(".sidebar").classList.add("open");
            setSideCheck(true);
        } else {
            document.querySelector('.sidebar').classList.remove('open');
            setSideCheck(false);
        }

    }

    const subMenu = (i) => {

        let x = document.querySelector('#parent-node').childNodes;
        if (!x[i].style.visibility || x[i].style.visibility === "hidden") {
            x[i].setAttribute('style', 'visibility: visible; position: relative;')
        } else if (x[i].style.visibility === "visible")
            x[i].setAttribute('style', 'visibility: hidden; position: absolute')

    }
    const decryptedData = decryptData(sessionStorage.getItem('myId'))
    const myRole = decryptData(sessionStorage.getItem('myRole'));
    return (<div className="containers">
        <nav>
            <Navbar openMenu={clickMenu} myEvent={faInbox} endPoint={'my-events/upcoming-events/invited/'} onClick={() => navigate(`create-event/${id}`)} />
        </nav>


        <main>
            {/* <div>{dimension.height}, {dimension.width}</div> */}
            {decryptedData == id ?
                <Outlet />
                :
                navigate('/')

            }
        </main>

        <div className="sidebar">

            {sideCheck ?
                <div id="parent-node">
                    <div className="liClick" onClick={() => navigateEvents(`upcoming-events/${id}`)}><FontAwesomeIcon icon={faFastForward} size="x" color="#91A4B7" /><span>Upcoming Events</span><FontAwesomeIcon icon={faAngleDown} onClick={() => { subMenu(1); }} /></div>
                    <div className="liClick" onClick={() => navigateEvents(`ongoing-events/${id}`)}><FontAwesomeIcon icon={faFastForward} size="x" color="#91A4B7" /><span>Ongoing Events</span></div>
                    <div className="liClick" onClick={() => navigateEvents(`cancelled-events/${id}`)} ><FontAwesomeIcon icon={faStopCircle} size="x" color="#91A4B7" /><span>Cancelled Events</span></div>
                    <div className="liClick" onClick={() => navigateEvents(`past-events/${id}`)}><FontAwesomeIcon icon={faCheckCircle} size="x" color="#91A4B7" /><span>Past Events</span><FontAwesomeIcon icon={faAngleDown} onClick={() => { subMenu(5) }} /></div>
                    <div className="liClick" onClick={() => navigateEvents(`calender-events/${id}`)}><FontAwesomeIcon icon={faCalendar} size="x" color="#91A4B7" /><span>Calender</span></div>
                </div>
                :
                <div id="mini-parent-node">
                    <div className='sideBarIcons'><FontAwesomeIcon icon={faCalendar} size="2x" color="#91A4B7" onClick={() => navigateEvents(`calender-events/${id}`)} /><span className='sideBarText'>Calendar</span></div>
                    &nbsp; <div className='sideBarIcons'><FontAwesomeIcon icon={faFastForward} size="2x" color="#91A4B7" onClick={() => navigateEvents(`upcoming-events/${id}`)} /><span className='sideBarText'>Upcoming Events</span></div>
                    <div className='sideBarIcons'><FontAwesomeIcon icon={faFastForward} size="2x" color="#91A4B7" onClick={() => navigateEvents(`ongoing-events/${id}`)} /><span className='sideBarText'>Ongoing Events</span></div>
                    <div className='sideBarIcons'><FontAwesomeIcon icon={faCheckCircle} size="2x" color="#91A4B7" onClick={() => navigateEvents(`past-events/${id}`)} /><span className='sideBarText'>Completed Events</span></div>
                    <div className='sideBarIcons'><FontAwesomeIcon icon={faStopCircle} size="2x" color="#91A4B7" onClick={() => navigateEvents(`cancelled-events/${id}`)} /><span className='sideBarText'>Cancelled Events</span></div>
                </div>
            }

            {myRole === '1' ? <div><SwitchUserAdminBtn myEvent={faInbox} endPoint={'my-events/upcoming-events/invited/'} onClick={() => navigate(`create-event/${id}`)} checkAdmin={true} /></div> : null}
            {/* Error while mapping in SideBar! <SideBar listContent = {["Upcoming Events"]} listItemFn={[navigateEvents("upcoming-events")]} /> */}
        </div>
    </div>
    )
}

export default MainPage;