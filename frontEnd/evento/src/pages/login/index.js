import React from "react";
import { useNavigate } from "react-router-dom";


//import './Login.css'
import {useState} from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';


function LoginForm(){
    localStorage.clear();
    return (
        <>
      
        <MyForm/>
        </>
    );
}

function MyForm(props){
    const [inputs, setInputs] = useState({});

    function handleChange(event){
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name] : value}))
    };

    function handleSubmit(event){
        event.preventDefault();
        console.log(inputs);

        axios.post('http://localhost:4000/users/login', inputs)
            .then(response => { 
                localStorage.setItem('myToken', response.data.accessToken)
                localStorage.setItem('myRole', response.data.user.userRole.roleId)
                console.log(response)
                alert("Welcome" + " " + response.data.user.username)
                       
            })
            .catch(error =>{
                localStorage.clear();
                if(error.response){
                    alert(error.response.data)  //=> response payload
                }
            })
    };

    function goToHome(){
        window.location = '/';
    }

    return(
        <>
        {/* <div className="form" style={{
            margin:'auto',
            justifyContent:'center',
            alignItems:'center',
            width : '25%',
            marginTop : '40px'
            }}> */}

        <div className='wrapper'>
         <center> <h1 className="display-3" style={{marginTop: '20px'}}> Sign In</h1></center>   
        <Form onSubmit = {handleSubmit}>
            <Form.Group className="p-3 mt-3">
                            <Form.Label>User Name</Form.Label>
                <div className="form-field d-flex align-items-center"> <span className="fa fa-user"></span>
                <Form.Control className="input" type = "text" name = "username" placeholder = "Enter UserName"
                        value = {inputs.username || ''} onChange = {handleChange} 
                        required></Form.Control>
                {/* <Form.Text className="text-muted">
                    Do not share your login credentials with anyone other than the login purposes
                </Form.Text> */}
                </div>
            </Form.Group>

            <Form.Group className="mb-3">
           
            <Form.Label>Password</Form.Label>
            <div className="form-field d-flex align-items-center"> <span className="fa fa-key"></span>
            <Form.Control className="input" type = "password" name = "password" placeholder = "Enter Password"
                        value = {inputs.password || ''} onChange = {handleChange}
                        required></Form.Control>
                        
                </div>
            </Form.Group>
        

            <center>
            <Button variant="primary" type="submit" style={{backgroundColor:'#004b6e'}}>Login</Button>&nbsp;&nbsp;
            <Button variant="danger" onClick = {goToHome} >Cancel</Button>
            </center>

        </Form>

        </div>
        </>
    );

};
export default LoginForm;