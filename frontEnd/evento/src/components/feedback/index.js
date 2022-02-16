import React, { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import { Button, Form, Container } from 'react-bootstrap';
import Rate from "../Rate";
import axios from "axios"
import apiHandler from "../../api-handling";




function Feedback(props) {
    const [rating, setRating] = useState(0); 
    const [feedback,setFeedback] = useState('');
    const [flag,setFlag] = useState(false);

   

    const handleChange = (event) =>{
        const value = event.target.value;
        setFeedback(value)
    }

    const handleFeedback = async (invitationId) => {

        console.log({
            invitationId:invitationId,
            feedback:feedback
        })

        // axios
        //     .post('http://localhost:4000/feedbacks',{
        //         invitationId:invitationId,
        //         feedback:feedback
        //     })
        //     .then(response => {
                
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })

        
            const x = await apiHandler('post',`feedbacks`,{
                         invitationId:invitationId,
                         feedback:feedback
                     })
            //console.log(x.data);
            
    

            setFlag(true);

    }


    return (
        <div >
            <Popup trigger={<Button variant="primary" size="sm">Feedback</Button>}
                position="bottom right ">
                <Container style={{ backgroundColor: "white" }} id="triggerBox">
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <Form.Label>Event Title :&nbsp;</Form.Label>
                            <Form.Label style={{fontWeight:"bold"}}> {props.title}</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Feedback</Form.Label>
                            <Form.Control as="textarea" onChange={handleChange} rows={3} />
                        </Form.Group>
                        {/* <Rate rating={rating} onRating={(rate) => setRating(rate)} /> */}

                        {!flag ? <Button variant="primary" type="submit" onClick={() => handleFeedback(props.invitationId)}>
                            Submit
                        </Button>:<Button variant="danger" onClick={() => {const x = document.getElementById("triggerBox");console.log(x); x.style.display='none'; window.location.reload(false)}}>Close</Button>
                        }
                    </Form>
                </Container>
            </Popup>
        </div>
    );
}
export default Feedback;