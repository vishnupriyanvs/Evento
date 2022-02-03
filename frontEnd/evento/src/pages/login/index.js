import React from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";


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
        console.log(inputs);

        axios.post('http://localhost:4000/users/login', inputs)
            .then(response => {
                console.log(response)
                console.log(response.data.user.id)
                sessionStorage.setItem('myToken', response.data.accessToken)
                sessionStorage.setItem('myRole', response.data.user.roles[0].user_roles.roleId)
                toast.success("Welcome" + " " + response.data.user.name, {
                    transition: Slide,
                    hideProgressBar: false,
                    autoClose: 6000
                })
                navigate(`user/temp/${response.data.user.id}`)
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
                            {/* <Form.Text className="text-muted">
                    Do not share your login credentials with anyone other than the login purposes
                </Form.Text> */}
                        </div>
                    </Form.Group>

                    <Form.Group className="mb-3">

                        <Form.Label>Password</Form.Label>
                        <div className="form-field d-flex align-items-center"> <span className="fa fa-key"></span>
                            <Form.Control className="input" type="password" name="password" placeholder="Enter Password"
                                value={inputs.password || ''} onChange={handleChange}
                                required></Form.Control>

                        </div>
                    </Form.Group>


                    <center>
                        <Button variant="primary" type="submit" >Login</Button>&nbsp;&nbsp;
                        <Button variant="danger" >Cancel</Button>
                    </center>

                </Form>

            </div>
        </>
    );

};
export default LoginForm;