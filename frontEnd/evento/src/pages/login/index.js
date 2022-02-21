import React from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import './index.css'


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

toast.configure()
function MyForm(props) {
    
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate()

    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    };

    function handleSubmit(event) {
        event.preventDefault();


        axios.post('http://localhost:4000/users/login', inputs)
            .then(response => {

                sessionStorage.setItem('myToken', response.data.accessToken)
                sessionStorage.setItem('refreshToken', response.data.refreshToken)
                sessionStorage.setItem('myRole', response.data.user.roles[0].user_roles.roleId)
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

    // function goToHome(){
    //     window.location = '/';
    // }

    return (
        
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