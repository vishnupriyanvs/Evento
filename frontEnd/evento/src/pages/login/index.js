import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import encryptData from "../../client-side-encryption/encrypt";
import { useState } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { toast, Slide } from 'react-toastify';
import { useToastBox } from "../../components/toast";

import { useParams } from 'react-router-dom';

function LoginForm() {
    // sessionStorage.clear();
    return (
        <>

            <MyForm />
        </>
    );
}

toast.configure()
function MyForm(props) {

    // const { role,accessToken, refreshToken } = useParams()
    // console.log(role)
    
    

    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const {handleSuccessToast, handleErrorToast} = useToastBox()
    const [msal,setMsal] = useState(null);

    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    console.log(params)

    useEffect(() => {
    if(params.msal){
        console.log(params)

        sessionStorage.setItem('myToken', params.accessToken)
        sessionStorage.setItem('refreshToken', params.refreshToken)
               
        const encryptedRoleId = encryptData(params.role)
        const encryptedId = encryptData(params.id)
        sessionStorage.setItem('myRole', encryptedRoleId)
        sessionStorage.setItem('myId',encryptedId)
        handleSuccessToast(`Welocme  ${params.name}`)
        console.log(params.role)
        // useEffect(() => {
            if (params.role == 1) {
                console.log(params.role)
                navigate(`/user/upcoming-events/${params.id}`)
            }
            else if (params.role == 2) {
                navigate(`/user/my-events/upcoming-events/invited/${params.id}`)
            }
        // },[])  
    }
},[params])
    

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
               
                const encryptedRoleId = encryptData(response.data.user.roles[0].user_roles.roleId)
                const encryptedId = encryptData(response.data.user.id)
                sessionStorage.setItem('myRole', encryptedRoleId)
                sessionStorage.setItem('myId',encryptedId)
                handleSuccessToast(`Welocme + ${response.data.user.name}`)
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
                    handleErrorToast('Incorrect credentials')  //=> response payload
                }
            })
    };

    // function goToHome(){
    //     window.location = '/';
    // }
// useEffect(() => {
//     if(params.accessToken){
//         navigate(`/user/upcoming-events/${params.id}`)
//     }
// },[])
    function msalLogin(){
        // setMsal(params.accessToken)
        // sessionStorage.setItem('myToken', params.accessToken)
        // sessionStorage.setItem('refreshToken', params.refreshToken)
               
        // const encryptedRoleId = encryptData(params.role)
        // const encryptedId = encryptData(params.id)
        // sessionStorage.setItem('myRole', encryptedRoleId)
        // sessionStorage.setItem('myId',encryptedId)
        // handleSuccessToast(`Welocme  ${params.name}`)
        // console.log(params.role)
        // // useEffect(() => {
        //     if (params.role == 1) {
        //         console.log(params.role)
        //         navigate(`/user/upcoming-events/${params.id}`)
        //     }
        //     else if (params.role == 2) {
        //         navigate(`/user/my-events/upcoming-events/invited/${params.id}`)
        //     }
        
    }
    // console.log(data)

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

                        <br/><br/>
                            <center>
                                <button><a href='http://localhost:4000/microsoft-login' onClick={() => {msalLogin()}} >MS Login</a></button>
                            </center>
                    </div>

                </div>
            </div>
            <script type="text/javascript" src="vanilla-tilt.js"></script>
    
        {/* <div style={{backgroundColor:'black'}} dangerouslySetInnerHTML={{__html:msal}}/> */}
            
            
        </div>
    );

};
export default LoginForm;