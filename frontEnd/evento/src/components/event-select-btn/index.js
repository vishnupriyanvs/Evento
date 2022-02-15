import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import './index.css';
import axios from "axios";
import Popup from 'reactjs-popup';
import { Button, Form, Container } from 'react-bootstrap';

function StatusSelectionBtn(props) {
    const [options, setOptions] = useState(["Hi", "Its", "Working"]);
    const [defaults, setDefault] = useState();
    const [cancellationReason, setCancellationReason] = useState('');

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
    const handleEventCancellation = () =>{
        axios
            .put(`http://localhost:4000/events/cancellation/reason/${props.eventid}`,{
                cancellationReason:cancellationReason
            })
            .then(response => {
                
                
            })
            .catch(error => {
                console.log(error)
            })
    }

    //console.log(props.eventid)
    function handleChange(status){
       
        if(status === "Cancelled"){
            return(
                <Popup trigger={<Button variant="danger"  size="sm">No</Button>}
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
                        {/* <Rate rating={rating} onRating={(rate) => setRating(rate)} /> */}

                        {/* {!flag ? <Button variant="primary" type="submit" onClick={() => handleCancellation(props.invitationId)}>
                            Submit
                        </Button>:<Button variant="danger" onClick={() => {const x = document.getElementById("triggerBox");console.log(x); x.style.display='none'; window.location.reload(false)}}>Close</Button>
                        } */}
                        <Button variant="primary" type="submit" onClick={() => handleEventCancellation()}>
                            Submit
                        </Button>
                    </Form>
                </Container>
            </Popup>
            )
        }
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