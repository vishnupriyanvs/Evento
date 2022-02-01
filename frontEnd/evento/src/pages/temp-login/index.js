import React from "react";
import {useState, useEffect} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom'


function AdminAccess(){
    const {id} = useParams()
    console.log(id)
    const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log("The use effect hook has been executed");

    var config = {
        method: 'get',
        url: `http://localhost:4000/users/${id}`,
        headers: { 
          'Authorization': `Bearer ${sessionStorage.getItem('myToken')}`, 
          'Content-Type': 'application/json'
        }
      };

    axios(config).then((response) => {
      console.log("promise fulfilled");
      console.log(response);
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
      </div>
    </>
  );
};

export default AdminAccess;