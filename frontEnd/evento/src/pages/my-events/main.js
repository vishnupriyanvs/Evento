import React, { useEffect, useState, useContext } from 'react';
import Navbar from '../../components/navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faFastForward, faCheckCircle, faStopCircle, faAngleDown, faMask, faBars } from '@fortawesome/free-solid-svg-icons';
// import './index.css';
import { Outlet, useNavigate } from 'react-router-dom';
import SwitchUserAdminBtn from '../../components/switch-user-admin-btn';
import { useParams } from 'react-router-dom';
import decryptData from '../../client-side-encryption/decrypt';
import SwitchContext from '../../components/context/switchuser';


function UsersMainPage() {
    const { id } = useParams()
    //console.log('from Main page '+id)
    const navigate = useNavigate();

    const [dimension, setDimension] = useState({})
    const [sideCheck, setSideCheck] = useState(false);
    // const [switchUser,setSwitchUser] = useContext(SwitchContext);
    const role =decryptData(sessionStorage.getItem('myRole'));
    useEffect(() => {
        //console.log("width");
        // navbarCheck();
        setDimension({
            height: window.innerHeight,
            width: window.innerWidth
        })
    }, [sideCheck]);
   
    const handleUserSwitch = () =>{
        // if(switchUser == 0){
        //     navigate(`/user/upcoming-events/${id}`)
        // }
       
    }
    // useEffect(() => {
    //     // handleUserSwitch();
    //     navigate(`/user/upcoming-events/${id}`)
    // }, []);
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
            <Navbar openMenu={clickMenu} onClick={() => navigate(`create-event/${id}`)} myEvent={faMask} endPoint={'/user/upcoming-events/'} />
        </nav>


        <main>
            {decryptedData == id ?
                <Outlet />
                :
                navigate('/')

            }
        </main>

        <div className="sidebar">


        <div className='sideBarx'><FontAwesomeIcon icon={faBars} size="2x" onClick={clickMenu} color="#91A4B7" /></div>
            {sideCheck ?
                <div id="parent-node">

                    <div className="liClick" ><FontAwesomeIcon icon={faFastForward} size="x" color="#91A4B7" /><span>Upcoming Events</span><FontAwesomeIcon icon={faAngleDown} onClick={() => { subMenu(1); }} /></div>
                    <div className='ul-div'>
                        <div className='li-div'  ><div className='li-div-text' onClick={() => navigateEvents(`my-events/upcoming-events/invited/${id}`)}>Invited Events</div></div>
                        <div className='li-div'><div className='li-div-text' onClick={() => navigateEvents(`my-events/upcoming-events/accepted/${id}`)}>Accepted Events</div></div>
                        <div className='li-div'><div className='li-div-text' onClick={() => navigateEvents(`my-events/upcoming-events/rejected/${id}`)}>Rejected Events</div></div>

                    </div>

                    <div className="liClick" onClick={() => navigateEvents(`my-events/ongoing-events/${id}`)}><FontAwesomeIcon icon={faFastForward} size="x" color="#91A4B7" /><span>Ongoing Events</span></div>
                    <div className="liClick" onClick={() => navigateEvents(`my-events/cancelled-events/${id}`)} ><FontAwesomeIcon icon={faStopCircle} size="x" color="#91A4B7" /><span>Cancelled Events</span></div>

                    <div className="liClick" ><FontAwesomeIcon icon={faCheckCircle} size="x" color="#91A4B7" /><span>Past Events</span><FontAwesomeIcon icon={faAngleDown} onClick={() => { subMenu(5) }} /></div>
                    <div className='ul-div'>
                        <div className='li-div'><div className='li-div-text' onClick={() => navigateEvents(`my-events/past-events/rejected/${id}`)}>Rejected Events</div></div>
                        <div className='li-div'><div className='li-div-text' onClick={() => navigateEvents(`my-events/past-events/accepted/${id}`)}>Accepted Events</div></div>

                    </div>
                    <div className="liClick" onClick={() => navigateEvents(`my-events/calendar-events/${id}`)}><FontAwesomeIcon icon={faCalendar} size="x" color="#91A4B7" /><span>Calender</span></div>

                </div> : <div>
                    <div className='sideBarIcons'><FontAwesomeIcon icon={faCalendar} size="2x" color="#91A4B7" onClick={() => navigateEvents(`my-events/calendar-events/${id}`)} /><span className='sideBarText'>Calendar</span></div>
                    &nbsp; <div className='sideBarIcons'><FontAwesomeIcon icon={faFastForward} size="2x" color="#91A4B7" onClick={() => navigateEvents(`my-events/upcoming-events/invited/${id}`)} /><span className='sideBarText'>Upcoming Events</span></div>
                    <div className='sideBarIcons'><FontAwesomeIcon icon={faFastForward} size="2x" color="#91A4B7" onClick={() => navigateEvents(`my-events/ongoing-events/${id}`)} /><span className='sideBarText'>Ongoing Events</span></div>
                    <div className='sideBarIcons'><FontAwesomeIcon icon={faCheckCircle} size="2x" color="#91A4B7" onClick={() => navigateEvents(`my-events/past-events/accepted/${id}`)} /><span className='sideBarText'>Completed Events</span></div>
                    <div className='sideBarIcons'><FontAwesomeIcon icon={faStopCircle} size="2x" color="#91A4B7" onClick={() => navigateEvents(`my-events/cancelled-events/${id}`)} /><span className='sideBarText'>Cancelled Events</span></div>
                </div>}

            {/* {myRole === '1' ? <div><SwitchUserAdminBtn onClick={() => navigate(`create-event/${id}`)} myEvent={faMask} endPoint={'/user/upcoming-events/'} checkAdmin={false} /></div> : null} */}
            {/* Error while mapping in SideBar! <SideBar listContent = {["Upcoming Events"]} listItemFn={[navigateEvents("upcoming-events")]} /> */}
        </div>
    </div>
    )
}

export default UsersMainPage;