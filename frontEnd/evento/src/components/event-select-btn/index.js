import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import './index.css';
import axios from "axios";

function StatusSelectionBtn(props) {
    const [options, setOptions] = useState(["Hi", "Its", "Working"]);
    const [defaults, setDefault] = useState();

    useEffect(() => {
        setDefault(props.given);
        setOptions(props.options);
        styleSet(props.given, props.index);
        let a = document.querySelectorAll('.SelectnBtn1-content');
        

    }, [])

    const styleSet = (item, key) => {
        let a = document.querySelectorAll('.SelectnBtn1-content');
        if (item === 'InProgress')
            a[key].setAttribute('style', 'outline:1px solid #FF8A00; color:#FF8A00')
        if (item === 'Cancelled')
            a[key].setAttribute('style', 'outline: 1px solid rgb(243, 20, 20); color:rgb(243, 20, 20);')
        if (item === 'Active')
            a[key].setAttribute('style', 'outline: 1px solid #0000FF; color: #0000FF')
        if (item === 'Completed')
            a[key].setAttribute('style', 'outline:1px solid rgb(20, 243, 20); color: rgb(20, 243, 20)')

    }

    //console.log(props.eventid)
    function handleChange(status){
       

        axios.put(`http://localhost:4000/events/${props.eventid}/${status}`)
            .then(response => {
               
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (

        <div className="SelectnBtn1">
            <div className="SelectnBtn1-content">
                <div>{options.includes(defaults) ? defaults : null}</div>
                <div> <FontAwesomeIcon icon={faAngleDown} /></div>
            </div>
            {props.role === 'Admin' ? (<div className="SelectnBtn1-options">
                {
                    options.map((item, i) => {
                        if (item !== defaults) {
                            return (
                                <div key={i} className="SelectnBtn1-option" onClick={() => {
                                    setDefault(item)
                                    let a = document.querySelectorAll('.SelectnBtn1-content');
                                    if (item === 'InProgress') {
                                        a[props.index].setAttribute('style', 'outline:1px solid #FF8A00; color:#FF8A00')
                                        handleChange(item);
                                    }
                                    if (item === 'Cancelled'){
                                        a[props.index].setAttribute('style', 'outline: 1px solid rgb(243, 20, 20); color:rgb(243, 20, 20);')
                                        handleChange(item)}
                                    if (item === 'Active'){
                                        a[props.index].setAttribute('style', 'outline: 1px solid #0000FF; color: #0000FF')
                                        handleChange(item)}
                                    if (item === 'Completed'){
                                        a[props.index].setAttribute('style', 'outline:1px solid rgb(20, 243, 20); color: rgb(20, 243, 20)')
                                        handleChange(item)}

                                   
                                }}>{item}</div>
                            )
                        }
                    }

                    )
                }
            </div>) : null}


        </div>



    )
}

export default StatusSelectionBtn;