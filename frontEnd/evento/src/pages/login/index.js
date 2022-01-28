import React from "react";
import { useNavigate } from "react-router-dom";


function Login(){

    const navigate = useNavigate();

    const handleClick = ()=>{
        navigate("/user/");
    }


    return(
        <div>
            This is login page<br/>
            <button onClick={handleClick}>Login</button>
        </div>
    )
}

export default Login;