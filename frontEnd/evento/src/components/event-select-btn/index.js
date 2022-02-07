import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import './index.css';

function StatusSelectionBtn(props) {
    const [options, setOptions] = useState(["Hi", "Its", "Working"]);
    const [defaults, setDefault] = useState();

    useEffect(() => {
        setDefault(props.given);
        setOptions(props.options);
        styleSet(props.given);

    }, [])

    const styleSet = (item) => {
        let a = document.querySelector('.SelectnBtn1-content');
        if (item === 'InProgress')
            a.setAttribute('style', 'outline:1px solid #FF8A00; color:#FF8A00')
        if (item === 'Cancelled')
            a.setAttribute('style', 'outline: 1px solid rgb(243, 20, 20); color:rgb(243, 20, 20);')
        if (item === 'Active')
            a.setAttribute('style', 'outline: 1px solid #0000FF; color: #0000FF')
        if (item === 'Completed')
            a.setAttribute('style', 'outline:1px solid rgb(20, 243, 20); color: rgb(20, 243, 20)')

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
                                    let a = document.querySelector('.SelectnBtn1-content');
                                    if (item === 'InProgress') {
                                        a.setAttribute('style', 'outline:1px solid #FF8A00; color:#FF8A00')
                                    }
                                    if (item === 'Cancelled')
                                        a.setAttribute('style', 'outline: 1px solid rgb(243, 20, 20); color:rgb(243, 20, 20);')
                                    if (item === 'Active')
                                        a.setAttribute('style', 'outline: 1px solid #0000FF; color: #0000FF')
                                    if (item === 'Completed')
                                        a.setAttribute('style', 'outline:1px solid rgb(20, 243, 20); color: rgb(20, 243, 20)')

                                    console.log(a)
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