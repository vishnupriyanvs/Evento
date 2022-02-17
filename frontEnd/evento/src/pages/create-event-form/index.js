import axios from 'axios'
import React, { useState, useEffect } from 'react'
import EventForm from "../../components/event-form";
import './index.css'
import apiHandler from '../../api-handling';
import { useParams } from 'react-router-dom';


function CreateEventForm() {
    const { id } = useParams()


    const [events, setEvents] = useState({})
    const [users, setUsers] = useState([])
    const [file, setFile] = useState(null);
    const [filename, setFileName] = useState()
    const options = []

    function handleContactPerson(event){
        let name, value;
        
        name = event.name
        value = event.value
          
        setEvents(values => ({ ...values, [name]: value }))
    }


    function handleChange(event) {
        let name, value;
        name = event.target.name
        value = event.target.value
        //Start Date Validation
        if (event.target.name === "startDate") {
            var today = new Date();          
            const selectDate = new Date(event.target.value)
            if(selectDate < today){
                alert("Please enter a valid date")
                event.target.value = null
                return false
            }
        }
        //End Date Validation
        if (event.target.name === "endDate") {
            var today = new Date(); 
            const tempDate = document.getElementById("start-date").value 
            const startDate = new Date(tempDate);   
            const selectDate = new Date(event.target.value)
            if(selectDate < today || selectDate < startDate){
                alert("Please enter a valid date")
                event.target.value = null
                return false
            }
        }
        //Start Time Validation
        if(event.target.name === "endTime"){
            const tempStartDate = document.getElementById("start-date").value 
            const tempEndDate = document.getElementById("end-date").value 
            const tempStartTime = document.getElementById("start-time").value 
            const tempEndTime = event.target.value
            
            if(tempEndDate === tempStartDate){
                
                if(tempStartTime === tempEndTime){
                    alert("Please enter a valid time")
                    event.target.value = null
                    return false
                }
                if(tempStartTime > tempEndTime){
                    alert("Please enter a valid time")
                    event.target.value = null
                    return false
                }
            }
        }
        setEvents(values => ({ ...values, [name]: value }))
    }

    function handleFileChange(event) {
        setFile(event.target.files[0])
        setFileName(event.target.files[0].name)
    }
    //console.log('line 23' + events)
    // useEffect(() => {
    //     axios
    //         .get("http://localhost:4000/users/contactpersons")
    //         .then((response) => {
    //             setUsers(response.data);
    //         });
    // }, []);

    useEffect(async () => {
        const x = await apiHandler('get',`users/contactpersons`)
        //console.log(x.data);
        setUsers(x.data)
      },[])

    users.map((user) => {
        const obj = { value: `${user.id}`, label: `${user.name}`, name: 'contact_person' }
        options.push(obj)
    })



    const handleSubmit = async (event) => {

        event.preventDefault()
        const formData = new FormData()
        formData.append('avatar', file);
        // var config = {
        //     method: 'post',
        //     url: 'http://localhost:4000/images/upload',
        //     data: formData,
        //     headers: { 
        //         'Authorization': `Bearer ${sessionStorage.getItem('myToken')}`, 
        //         'Content-Type': 'application/json'
        //       }
        // };
        setEvents(values => ({ ...values, "created_by": id, "updated_by": id }))
        
        
        
            const response = await apiHandler('post',`events`,events)
        
            setEvents(response.data);
            const imageResponse = await apiHandler('post',`images/upload/${response.data.id}`,formData)
        
          
        // axios
        //     .post('http://localhost:4000/events/', events)
        //     .then(async response => {
        //         setEvents(response.data);
        //         console.log(response.data.id);
        //         formData.append('eventid', response.data.id)
        //         config.url = `http://localhost:4000/images/upload/${response.data.id}`
        //         const x = await axios(config);
        //         //console.log(x.data)
        //         alert(`${events.title} added successfully`)
        //     })
        //     .catch(error => {
        //         console.log(error)
        //     })
    }

    const handleReset = () => {
        console.clear()
    }

    console.log(users)
    return (
        <div className="createEventForm">
            <EventForm
                events={events}
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleContactPerson={handleContactPerson}
                handleFileChange={handleFileChange}
                handleReset={handleReset}
                users={options}
                buttonValue="Create Event"
                created_by={id} />
        </div>
    )
}

export default CreateEventForm;