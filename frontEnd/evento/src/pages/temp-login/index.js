import React from "react";
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'


function AdminAccess(){
    const {id} = useParams()
  
    const [users, setUsers] = useState([]);

  useEffect(() => {
   

    var config = {
        method: 'get',
        url: `http://localhost:4000/users/${id}`,
        headers: { 
          'Authorization': `Bearer ${sessionStorage.getItem('myToken')}`, 
          'Content-Type': 'application/json'
        }
      };

    axios(config).then((response) => {
     
      setUsers(response.data);
    })

    .catch(error =>{
        sessionStorage.clear();
        if(error){
            alert('Not authorized') 
        }
    })
  }, []);



  return (
    <>
      <div style={{ marginTop: "50px" }}>
        <h1 className="display-3" style={{marginTop: '20px'}}><b>User Data</b></h1>
        <h3>Name : {users.name}</h3>
        <h3>username : {users.username}</h3>
        <h3>password : {users.password}</h3>
        {/* <img src="E:\EVENTO\Evento\backEnd\asset\images\vsvj.jpg" /> */}
      </div>
    </>
  );
};

export default AdminAccess;