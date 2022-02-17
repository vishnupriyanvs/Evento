import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import './index.css';
import axios from "axios";
import Popup from 'reactjs-popup';
import { Button, Form, Container } from 'react-bootstrap';
import { confirm } from "react-confirm-box";
import services from "../../constants";
import apiHandler from "../../api-handling";

function StatusSelectionBtn(props) {
    const [options, setOptions] = useState(["Hi", "Its", "Working"]);
    const [defaults, setDefault] = useState();
    const [cancellationReason, setCancellationReason] = useState('');
    const [flag, setFlag] = useState(false);

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
    const handleReasonChange =(event) =>{
        const value = event.target.value;
        setCancellationReason(value);
    }
    const handleEventCancellation = async () =>{
        // axios
        //     .put(`http://localhost:4000/events/cancellation/reason/${props.eventid}`,{
        //         cancellationReason:cancellationReason,
        //         isActive: 'Cancelled'
        //     })
        //     .then(response => {
        //         console.log(response.data)
        //         setDefault("Cancelled")
                
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })

        
            const x = await apiHandler('put',`events/cancellation/reason/${props.eventid}`,{
                         cancellationReason:cancellationReason,
                         isActive: 'Cancelled'
                     })
            //console.log(x.data);
            setDefault("Cancelled")
          
    
            setFlag(true);

            

    }

    //console.log(props.eventid)
    async function handleChange(status){
    //     axios.put(`http://localhost:4000/events/${props.eventid}/${status}`)
    //         .then(response => {
               
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })
    const x = await apiHandler('put',`events/${props.eventid}/${status}`)
     }
    

    
        
        //console.log(x.data);
        

    //console.log(props.reason)
    return (

        <div className="SelectnBtn1">
            <div className="SelectnBtn1-content">


                {defaults === 'Cancelled' && options.includes(defaults) && props.eventType === services.eventType.UPCOMING_EVENT ?  <Popup trigger={<div >{props.reason !== undefined ? "Reason": defaults}</div>}
                position="bottom right ">
               
                <Container style={{ backgroundColor: "white" }} id="triggerBox">
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Event Title :&nbsp;</Form.Label>
                            <Form.Label style={{fontWeight:"bold"}}> {props.title}</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Reason for Cancellation</Form.Label>
                            <Form.Control as="textarea" onChange={handleReasonChange} rows={3} />
                        </Form.Group>

                        {!flag ? <Button variant="primary" type="submit" onClick={() => handleEventCancellation(props.invitationId)}>
                            Submit
                        </Button>:<Button variant="danger" onClick={() => {const x = document.getElementById("triggerBox");console.log(x); x.style.display='none'; window.location.reload(false)}}>Close</Button>
                        }
                    </Form>
                </Container>
            </Popup>:<div>{options.includes(defaults) ? defaults : null}</div>}
                
                {props.eventType === services.eventType.UPCOMING_EVENT || props.eventType === services.eventType.ONGOING_EVENT ? <div> <FontAwesomeIcon icon={faAngleDown} /></div> : null }
            </div>
            {props.role === 'Admin' ? (<div className="SelectnBtn1-options">
                {
                    options.map((item, i) => {
                        if (item !== defaults) {
                            return (
                                <div key={i} className="SelectnBtn1-option" onClick={async() => {
                                    setDefault(item)
                                    let a = document.querySelectorAll('.SelectnBtn1-content');
                                    if (item === 'InProgress') {
                                        a[props.index].setAttribute('style', 'outline:1px solid #FF8A00; color:#FF8A00')
                                        handleChange(item);
                                    }
                                    if (item === 'Cancelled'){
                                        const result = await confirm("Are you sure?");
                                        if (result) {
                                          
                                          a[props.index].setAttribute('style', 'outline: 1px solid rgb(243, 20, 20); color:rgb(243, 20, 20);')
                                          return;
                                        }
                                        window.location.reload(false)                                      // handleChange(item)
                                    }
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