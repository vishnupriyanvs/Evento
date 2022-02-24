import { useState } from "react";
import { useNavigate } from "react-router-dom";




export const useEventSelectBtn = ()=>{

    const [options, setOptions] = useState(["Hi", "Its", "Working"]);
    const [defaults, setDefault] = useState();
    const [cancellationReason, setCancellationReason] = useState('');
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();

    const handleReasonChange = (event) => {
        const value = event.target.value;
        setCancellationReason(value);
    }
}