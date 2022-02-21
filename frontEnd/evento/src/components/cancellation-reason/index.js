import React, { useEffect, useState } from "react";
import Popup from 'reactjs-popup';
import { Button, Form, Container } from 'react-bootstrap';
import axios from "axios"
import {useNavigate} from 'react-router-dom';
import apiHandler from '../../api-handling';
import './index.css';
import tokenHandler from "../../api-handling/tokenHandler";


function Cancellation(props) {
    
    const [cancellation,setCancellation] = useState('');
    const [flag,setFlag] = useState(false);
    const navigate = useNavigate();

    

    const handleChange = (event) =>{
        const value = event.target.value;
        setCancellation(value)
    }

    const handleCancellation = async (invitationId) => {

        // console.log({
        //     invitationId:invitationId,
        //     invitationCancelReason:cancellation
        // })

        // axios
        //     .put(`http://localhost:4000/invitations/${invitationId}`,{
        //         invitationCancelReason:cancellation,
        //         invitationResponse:"No"
        //     })
        //     .then(response => {
                
                
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
        try{
            try{
                const x = await apiHandler('put',`invitations/${invitationId}`,{invitationCancelReason:cancellation, invitationResponse:"No"})
                setFlag(true);
            }
            catch(err){
                const x = await tokenHandler('put',`invitations/${invitationId}`,sessionStorage.getItem('refreshToken'),apiHandler,{invitationCancelReason:cancellation, invitationResponse:"No"})
                setFlag(true);
            }

        }
        catch(err){
            navigate("/")
        }

        

    }


    return (
        <div >
            <Popup trigger={<Button variant="danger"  size="sm">No</Button>}
                position="bottom right "
               >
                <Container className= "resContainer"  id="triggerBox">
                    <Form onSubmit={(e) => e.preventDefault()}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            {/* <Form.Label>Event Title :&nbsp;</Form.Label> */}
                            
                            <Form.Label style={{fontWeight:"bold",marginLeft:'30%'}}> {props.title}</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Reason for Rejection</Form.Label>
                            <Form.Control as="textarea" onChange={handleChange} rows={3} />
                        </Form.Group>
                        {/* <Rate rating={rating} onRating={(rate) => setRating(rate)} /> */}

                        {!flag ? <Button  className = "resSubmit" variant="primary" type="submit" onClick={() => handleCancellation(props.invitationId)}>
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