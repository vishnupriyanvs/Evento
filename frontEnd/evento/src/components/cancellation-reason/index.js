import React, { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import { Button, Form, Container } from 'react-bootstrap';
import Rate from "../Rate";
import axios from "axios"





function Cancellation(props) {
    
    const [cancellation,setCancellation] = useState('');
    const [flag,setFlag] = useState(false);

    

    const handleChange = (event) =>{
        const value = event.target.value;
        setCancellation(value)
    }

    const handleCancellation = (invitationId) => {

        // console.log({
        //     invitationId:invitationId,
        //     invitationCancelReason:cancellation
        // })

        axios
            .put(`http://localhost:4000/invitations/${invitationId}`,{
                invitationCancelReason:cancellation,
                invitationResponse:"No"
            })
            .then(response => {
                
                
            })
            .catch(error => {
                console.log(error)
            })

            setFlag(true);

    }


    return (
        <div >
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
                            <Form.Control as="textarea" onChange={handleChange} rows={3} />
                        </Form.Group>
                        {/* <Rate rating={rating} onRating={(rate) => setRating(rate)} /> */}

                        {!flag ? <Button variant="primary" type="submit" onClick={() => handleCancellation(props.invitationId)}>
                            Submit
                        </Button>:<Button variant="danger" onClick={() => {const x = document.getElementById("triggerBox");console.log(x); x.style.display='none'; window.location.reload(false)}}>Close</Button>
                        }
                    </Form>
                </Container>
            </Popup>
        </div>
    );
}
export default Cancellation;