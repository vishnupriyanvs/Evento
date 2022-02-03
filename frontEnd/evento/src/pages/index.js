import React, { useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faCalendar, faFastForward, faCheckCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';
import SizedBox from '../components/sized-box';
import './index.css';
import { Outlet, useNavigate } from 'react-router-dom';


function MainPage() {

    const navigate = useNavigate();

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

    return (<div className="containers">
        <nav>
            <Navbar openMenu={clickMenu} onClick={()=> navigate("create-event")}/>
        </nav>


        <main>
            <div>{dimension.height}, {dimension.width}</div>
            <Outlet />
        </main>

        <div className="sidebar">

            {sideCheck ?
                <div>
                    {dimension.width > 1000 ? (<>
                        <SizedBox height="20vh" /></>) : null}
                    <div className="liClick" onClick={() => navigateEvents("upcoming-events")}><FontAwesomeIcon icon={faFastForward} size="x" color="#91A4B7" /><span>Upcoming Events</span></div>
                    <div className="liClick" onClick={() => navigateEvents("ongoing-events")}><FontAwesomeIcon icon={faFastForward} size="x" color="#91A4B7" /><span>Ongoing Events</span></div>
                    <div className="liClick"><FontAwesomeIcon icon={faStopCircle} size="x" color="#91A4B7" /><span>Cancelled Events</span></div>
                    <div className="liClick"><FontAwesomeIcon icon={faCheckCircle} size="x" color="#91A4B7" /><span>Past Events</span></div>
                    <div className="liClick"><FontAwesomeIcon icon={faCalendar} size="x" color="#91A4B7" /><span>Calender</span></div>
                  
                </div> : <div>
                    <div className='sideBarIcons'><FontAwesomeIcon icon={faCalendar} size="3x" color="#91A4B7" onClick={() => navigateEvents("calender-events")}/><span className='sideBarText'>Calendar</span></div>
                    <div className='sideBarIcons'><FontAwesomeIcon icon={faFastForward} size="3x" color="#91A4B7" onClick={() => navigateEvents("upcoming-events")}/><span className='sideBarText'>Upcoming Events</span></div>
                    <div className='sideBarIcons'><FontAwesomeIcon icon={faFastForward} size="3x" color="#91A4B7" onClick={() => navigateEvents("ongoing-events")}/><span className='sideBarText'>Ongoing Events</span></div>
                    <div className='sideBarIcons'><FontAwesomeIcon icon={faCheckCircle} size="3x" color="#91A4B7" onClick={() => navigateEvents("past-events")}/><span className='sideBarText'>Completed Events</span></div>
                    <div className='sideBarIcons'><FontAwesomeIcon icon={faStopCircle} size="3x" color="#91A4B7" onClick={() => navigateEvents("cancelled-events")} /><span className='sideBarText'>Cancelled Events</span></div>
                </div>}
            {/* Error while mapping in SideBar! <SideBar listContent = {["Upcoming Events"]} listItemFn={[navigateEvents("upcoming-events")]} /> */}
        </div>
    </div>
    )
}

export default MainPage;