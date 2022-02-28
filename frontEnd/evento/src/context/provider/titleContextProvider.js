import TitleContext from "../titleContext";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

export const TitleContextProvider = ({children})=>{

    const [titles, setTitles] = useState('Upcoming Events');

    const handleTitleChange = ()=>{
        if(sessionStorage.getItem('titles')){
            setTitles(sessionStorage.getItem('titles'));
        }
    }

    const handleTitles = (title)=>{
        sessionStorage.setItem('titles', title)
        setTitles(title)
    }

    useEffect(()=>{
        handleTitleChange();
    }, [titles])

    return(
        <TitleContext.Provider value={{
            titles,
            handleTitles
        }}>
            {children}
        </TitleContext.Provider>
    )
}