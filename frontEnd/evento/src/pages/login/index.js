import React from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import encryptData from "../../client-side-encryption/encrypt";
import { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { toast, Slide } from 'react-toastify';


function LoginForm() {
    
    sessionStorage.clear();
    return (
        <>
            <MyForm />
        </>
    );
}

toast.configure();

function MyForm(props) {
<<<<<<< HEAD

=======
    
>>>>>>> 90a9d2b2ebbda7e0677833f0bc0967a978adbe6e
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate()
    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    };

    function handleSubmit(event) {
        event.preventDefault();
<<<<<<< HEAD
=======


>>>>>>> 90a9d2b2ebbda7e0677833f0bc0967a978adbe6e
        axios.post('http://localhost:4000/users/login', inputs)
            .then(response => {

                sessionStorage.setItem('myToken', response.data.accessToken)
                sessionStorage.setItem('refreshToken', response.data.refreshToken)
               
                const encryptedRoleId = encryptData(response.data.user.roles[0].user_roles.roleId)
                const encryptedId = encryptData(response.data.user.id)
                sessionStorage.setItem('myRole', encryptedRoleId)
                sessionStorage.setItem('myId',encryptedId)
                toast.success("Welcome" + " " + response.data.user.name, {
                    transition: Slide,
                    hideProgressBar: false,
                    autoClose: 6000
                })
                if (response.data.user.roles[0].user_roles.roleId === 1) {
                    navigate(`/user/upcoming-events/${response.data.user.id}`)
                }
                else if (response.data.user.roles[0].user_roles.roleId === 2) {
                    navigate(`/user/my-events/upcoming-events/invited/${response.data.user.id}`)
                }
            })
            .catch(error => {
                sessionStorage.clear();
                if (error.response) {
                    alert(error.response.data)  //=> response payload
                }
            })
    };

    return (
<<<<<<< HEAD
        <>
            <div className='wrapper'>
                <center> <h1 className="display-3" style={{ marginTop: '20px' }}> Sign In</h1></center>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3">
                        <Form.Label>User Name</Form.Label>
                        <div className="form-field d-flex align-items-center"> <span className="fa fa-user"></span>
                            <Form.Control className="input" type="text" name="username" placeholder="Enter UserName"
                                value={inputs.username || ''} onChange={handleChange}
                                required></Form.Control>
                        </div>
                    </Form.Group>
=======
        
        <div className="loginBody">
            <div className="containerx">
                <div className="cardx" >
                    <div className="content">
                        <center>
                            <img className="experionImg" src ="experion.png"></img>
                            <h4 className="display-3" > Event Hosting Platform</h4>
                        </center>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <div className="form-field d-flex align-items-center"> <span className="fa fa-user"></span>
                                    <Form.Control className="input" type="text" name="username" placeholder="Enter Username"
                                        value={inputs.username || ''} onChange={handleChange}
                                        required>

                                    </Form.Control>
>>>>>>> 90a9d2b2ebbda7e0677833f0bc0967a978adbe6e

                                </div>
                            </Form.Group>

                            <Form.Group className="mb-3">

                                <Form.Label>Password</Form.Label>
                                <div className="form-field d-flex align-items-center"> <span className="fa fa-key"></span>
                                    <Form.Control className="input" type="password" name="password" placeholder="Enter Password"
                                        value={inputs.password || ''} onChange={handleChange}
                                        required>

                                    </Form.Control>

                                </div>
                            </Form.Group>


                            <center>
                                <button className="loginSubmit" type="submit" >Login</button>
                            </center>

                        </Form>
                    </div>

                </div>
            </div>
            <script type="text/javascript" src="vanilla-tilt.js"></script>
    
            
        </div>
    );

};
export default LoginForm;