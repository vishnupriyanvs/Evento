import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faFastForward, faCheckCircle, faStopCircle, faAngleDown, faInbox, faMask, faBars } from '@fortawesome/free-solid-svg-icons';
import './index.css';
import { Outlet, useNavigate } from 'react-router-dom';
import decryptData from '../client-side-encryption/decrypt';
import { useParams } from 'react-router-dom';
import SwitchUserAdminBtn from '../components/switch-user-admin-btn';
import TitleContext from '../context/titleContext';

function MainPage() {
    const {titles,setTitles} = useContext(TitleContext);
    const titleContext = useContext(TitleContext);
    const { id } = useParams()
    //console.log('from Main page '+id)
    const navigate = useNavigate();
    const role = decryptData(sessionStorage.getItem('myRole'));
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


    const navigateEvents = (eventype) => {
        navigate(`/user/${eventype}`);
    }

    const clickMenu = () => {
        if (!sideCheck) {
            document.querySelector(".sidebar").classList.add("open");
            document.getElementById('sideBarxId').style.alignItems = 'flex-start';
            document.getElementById('sideBarxId').style.paddingLeft = '6%';
            setSideCheck(true);
        } else {
            document.querySelector('.sidebar').classList.remove('open');
            document.getElementById('sideBarxId').style.alignItems = 'center';
            document.getElementById('sideBarxId').style.paddingLeft = '0%';
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
            <Navbar openMenu={clickMenu} myEvent={faInbox} endPoint={'my-events/upcoming-events/invited/'} onClick={() => { var modal = document.getElementById("myModal"); modal.style.display = "block"; }} />
            {/* navigate(`create-event/${id}`) */}
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


            <div className='sideBarx' id='sideBarxId'><FontAwesomeIcon icon={faBars} size="2x" onClick={clickMenu} color="#91A4B7" /></div>


            {sideCheck ?
                <div id="parent-node">
                    <div className="liClick" onClick={() => {navigateEvents(`calender-events/${id}`);titleContext.handleTitles('Calendar')}}><FontAwesomeIcon icon={faCalendar} size="2x" color="#91A4B7" /><span>Calender</span></div>
                    <div className="liClick" onClick={() => {navigateEvents(`upcoming-events/${id}`);titleContext.handleTitles('Upcoming Events')}}><FontAwesomeIcon icon={faFastForward} size="2x" color="#91A4B7" /><span>Upcoming Events</span></div>
                    <div className="liClick" onClick={() => {navigateEvents(`ongoing-events/${id}`);titleContext.handleTitles('Ongoing Events')}}><FontAwesomeIcon icon={faFastForward} size="2x" color="#91A4B7" /><span>Ongoing Events</span></div>
                    <div className="liClick" onClick={() => {navigateEvents(`past-events/${id}`);titleContext.handleTitles('Past Events')}}><FontAwesomeIcon icon={faCheckCircle} size="2x" color="#91A4B7" /><span>Past Events</span></div>
                    <div className="liClick" onClick={() => {navigateEvents(`cancelled-events/${id}`);titleContext.handleTitles('Cancelled Events')}} ><FontAwesomeIcon icon={faStopCircle} size="2x" color="#91A4B7" /><span>Cancelled Events</span></div>
                    
                    
                </div> : <div className='mini-parent-node'>
                    {/* <FontAwesomeIcon icon={faBars} size="2x" onClick={clickMenu} color="#91A4B7" className='sideBarIcons' /> */}

                    <div className='sideBarIcons'><FontAwesomeIcon classname='icon-close' icon={faCalendar} size="2x" color="#91A4B7" onClick={() => {navigateEvents(`calender-events/${id}`);titleContext.handleTitles('Calendar')}} /><span className='sideBarText'>Calendar</span></div>
                    <div className='sideBarIcons'><FontAwesomeIcon classname='icon-close' icon={faFastForward} size="2x" color="#91A4B7" onClick={() => {navigateEvents(`upcoming-events/${id}`);titleContext.handleTitles('Upcoming Events')}} /><span className='sideBarText'>Upcoming Events</span></div>
                    <div className='sideBarIcons'><FontAwesomeIcon classname='icon-close' icon={faFastForward} size="2x" color="#91A4B7" onClick={() => {navigateEvents(`ongoing-events/${id}`);titleContext.handleTitles('Ongoing Events')}} /><span className='sideBarText'>Ongoing Events</span></div>
                    <div className='sideBarIcons'><FontAwesomeIcon classname='icon-close' icon={faCheckCircle} size="2x" color="#91A4B7" onClick={() => {navigateEvents(`past-events/${id}`);titleContext.handleTitles('Cancelled Events')}} /><span className='sideBarText'>Completed Events</span></div>
                    <div className='sideBarIcons'><FontAwesomeIcon classname='icon-close' icon={faStopCircle} size="2x" color="#91A4B7" onClick={() => {navigateEvents(`cancelled-events/${id}`);titleContext.handleTitles('Past Events')}} /><span className='sideBarText'>Cancelled Events</span></div>
                </div>}

            {/* {myRole === '1' ? <div><SwitchUserAdminBtn myEvent={faInbox} endPoint={'my-events/upcoming-events/invited/'} onClick={() => navigate(`create-event/${id}`)} checkAdmin={true} /></div> : null} */}
            {/* Error while mapping in SideBar! <SideBar listContent = {["Upcoming Events"]} listItemFn={[navigateEvents("upcoming-events")]} /> */}
        </div>
    </div>
    )
}

export default MainPage;