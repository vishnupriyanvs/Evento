import "react-toastify/dist/ReactToastify.css";
import { toast, Slide } from 'react-toastify';

export const useToastBox = () => {


    const handleSuccessToast = (msgData) => {
        toast.success(msgData, {
            transition: Slide,
            hideProgressBar: false,
            autoClose: 6000
        })
    }
    const handleErrorToast = (msgData)=>{
        toast.error(msgData, {
            transition: Slide,
            hideProgressBar: false,
            autoClose: 6000
        })
    }

    return{
        handleSuccessToast,
        handleErrorToast
    }


}
