import React from "react";
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCoffee, faBars, faCalendar, faPowerOff, faImage } from '@fortawesome/free-solid-svg-icons'
import SearchBar from "./search-bar";
import SizedBox from "../sized-box";
import CreateEvent from "../create-event-btn";
import {useParams} from 'react-router-dom';

function Navbar(props) {
    const {id} = useParams()
    console.log('params id' + id)
    return (
        <div>
            <div className="mainFlex">

                <div className="flexLeftItem">
                    <SizedBox width="10px" />
                    <FontAwesomeIcon icon={faBars} size="4x" onClick={props.openMenu} color="#91A4B7"/>
                    <div>
                        Event Oh
                    </div>
                </div>

                <div className="flexRightItem">

                    {/* <FontAwesomeIcon icon={faCalendar} size="2x" onClick={props.onCalenderClick}/> */}
                    <SearchBar />
                    <SizedBox width="8vh" />
                    <CreateEvent onClick={props.onClick} id={id}/>
                    <SizedBox width="8vh" />
                    <FontAwesomeIcon icon={faImage} size="2x" color="#91A4B7"/>
                    
                    <div className="sizedBox" />

                </div>
            </div>
        </div>

    )
}

export default Navbar;