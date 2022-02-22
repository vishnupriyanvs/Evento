import React, { useEffect, useState,useContext } from 'react';
import Navbar from '../components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faFastForward, faCheckCircle, faStopCircle, faAngleDown, faInbox, faMask } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import SwitchUserAdminBtn from '../components/switch-user-admin-btn';
import decryptData from '../client-side-encryption/decrypt';
import AdminTitleContext from '../components/context';

function MainPage() {
    
    //This the useContext for getting global constant titles for displaying in navbar
    const {titles,setTitles} = useContext(AdminTitleContext)
    
    const { id } = useParams()
    const navigate = useNavigate();
    const [dimension, setDimension] = useState({})
    const [sideCheck, setSideCheck] = useState(false);
    
    //This is to get the encrypted data from session storages and check the set the corresponding role changes
    const decryptedData = decryptData(sessionStorage.getItem('myId'))
    const role = decryptData(sessionStorage.getItem('myRole'))

    //This is to check the screen width in the beginning stages
    useEffect(() => {
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
    
    
    return (
    <>
        <div className="containers">
            {/* Calling Navbar */}
            <nav>
                <Navbar openMenu={clickMenu} myEvent={faInbox} endPoint={'my-events/upcoming-events/invited/'} onClick={() => {navigate(`create-event/${id}`);setTitles('Create New Event')}} />
            </nav>
        <main>
            {decryptedData == id ?
                <Outlet  /> 
            :
                navigate('/')  
            } 
        </main>

        <div className="sidebar">
            {sideCheck ?
                <div id="parent-node">
                    {/* Sidebar Opening */}
                    <div className="liClick" onClick={() => {navigateEvents(`upcoming-events/${id}`);setTitles('Upcoming Events')}}><FontAwesomeIcon icon={faFastForward} size="x" color="#91A4B7" /><span>Upcoming Events</span><FontAwesomeIcon icon={faAngleDown} onClick={() => { subMenu(1); }} /></div>
                    <div className="liClick" onClick={() => {navigateEvents(`ongoing-events/${id}`);setTitles('Ongoing Events')}}><FontAwesomeIcon icon={faFastForward} size="x" color="#91A4B7" /><span>Ongoing Events</span></div>
                    <div className="liClick" onClick={() => {navigateEvents(`cancelled-events/${id}`);setTitles('Cancelled Events')}} ><FontAwesomeIcon icon={faStopCircle} size="x" color="#91A4B7" /><span>Cancelled Events</span></div>
                    <div className="liClick" onClick={() => {navigateEvents(`past-events/${id}`);setTitles('Past Events')}}><FontAwesomeIcon icon={faCheckCircle} size="x" color="#91A4B7" /><span>Past Events</span><FontAwesomeIcon icon={faAngleDown} onClick={() => { subMenu(5) }} /></div>
                    <div className="liClick" onClick={() => {navigateEvents(`calender-events/${id}`);setTitles('Calendar')}}><FontAwesomeIcon icon={faCalendar} size="x" color="#91A4B7" /><span>Calender</span></div>
                </div> 
                : 
                <div>
                    {/* Closed Sidebar */}
                    <div className='sideBarIcons'><FontAwesomeIcon icon={faCalendar} size="2x" color="#91A4B7" onClick={() => {navigateEvents(`calender-events/${id}`);setTitles('Calendar')}} /><span className='sideBarText'>Calendar</span></div>
                    &nbsp; 
                    <div className='sideBarIcons'><FontAwesomeIcon icon={faFastForward} size="2x" color="#91A4B7" onClick={() => {navigateEvents(`upcoming-events/${id}`);setTitles('Upcoming Events')}} /><span className='sideBarText'>Upcoming Events</span></div>
                    <div className='sideBarIcons'><FontAwesomeIcon icon={faFastForward} size="2x" color="#91A4B7" onClick={() => {navigateEvents(`ongoing-events/${id}`);setTitles('Ongoing Events')}} /><span className='sideBarText'>Ongoing Events</span></div>
                    <div className='sideBarIcons'><FontAwesomeIcon icon={faCheckCircle} size="2x" color="#91A4B7" onClick={() => {navigateEvents(`past-events/${id}`);setTitles('Past Events')}} /><span className='sideBarText'>Completed Events</span></div>
                    <div className='sideBarIcons'><FontAwesomeIcon icon={faStopCircle} size="2x" color="#91A4B7" onClick={() => {navigateEvents(`cancelled-events/${id}`);setTitles('Cancelled Events')}} /><span className='sideBarText'>Cancelled Events</span></div>
                </div>}

                {/* Admin - User Switch Button */}
                {role === '1' ? 
                <div>
                    <SwitchUserAdminBtn myEvent={faInbox} endPoint={'my-events/upcoming-events/invited/'} print='My Events - Upcoming - Invited' checkAdmin={true}/>
                </div>
                : null}
        </div>
        </div>
    </>
    )
}

export default MainPage;