import axios from 'axios'
import React, { useState, useEffect } from 'react'
import EventForm from "../../components/event-form";
import './index.css'
import { useParams, useNavigate } from 'react-router-dom';
import apiHandler from '../../api-handling';
import tokenHandler from '../../api-handling/tokenHandler';
import { toast, Slide } from 'react-toastify';

function EditEventForm(props) {
  console.log('hi')
  console.log(props)
  const { id, eventid } = useParams()

  const [events, setEvents] = useState({ updated_by: id})
  const [users, setUsers] = useState([])
  const options = [];
  const navigate = useNavigate();
  // const [submitted,setSubmitted] = useState(false)

  function handleChange(event) {
    let name, value;
    name = event.target.name
    value = event.target.value

    //console.log(event.target.name, event.target.value)
    //Start Date Validation
    if (event.target.name === "startDate") {
      var today = new Date();
      const selectDate = new Date(event.target.value)
      if (selectDate < today) {
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
      if (selectDate < today || selectDate < startDate) {
        alert("Please enter a valid date")
        event.target.value = null
        return false
      }
    }
    //Start Time Validation
    if (event.target.name === "endTime") {
      const tempStartDate = document.getElementById("start-date").value
      const tempEndDate = document.getElementById("end-date").value
      const tempStartTime = document.getElementById("start-time").value
      const tempEndTime = event.target.value

      if (tempEndDate === tempStartDate) {

        if (tempStartTime === tempEndTime) {
          alert("Please enter a valid time")
          event.target.value = null
          return false
        }
        if (tempStartTime > tempEndTime) {
          alert("Please enter a valid time")
          event.target.value = null
          return false
        }
      }
    }

    setEvents(values => ({ ...values, [name]: value }))
  }
  // setEvents(values => ({...values,"created_by":`${id}`}))

  // useEffect(() => {
  //     axios.get(`http://localhost:4000/events/${eventid}`)
  //         .then(response => {

  //             setEvents(response.data);
  //         })
  //         .catch(error => {
  //             console.log(error)
  //         })
  // },[])

  // useEffect(async () => {
  //     const x = await apiHandler('get',`events/${eventid}`)
  //     //console.log(x.data);
  //     setEvents(x.data)
  //   },[])

  useEffect(async () => {
    try {
      try {
        const x = await apiHandler('get', `events/${props.eventid}`);
        //console.log(x.data);
        setEvents(x.data);
      } catch (error) {
        const x = await tokenHandler('get', `events/${props.eventid}`, sessionStorage.getItem('refreshToken'), apiHandler);
        setEvents(x.data);
      }
    }
    catch {
      navigate('/');
    }
  }, [props.eventid])

  // useEffect(() => {
  //     axios
  //         .get("http://localhost:4000/users/contactpersons")
  //             .then((response) => {


  //             setUsers(response.data);
  //     });
  //   },[]);

  // useEffect(async () => {
  //     const x = await apiHandler('get',`users/contactpersons`)
  //     //console.log(x.data);
  //     setUsers(x.data)
  //   },[])

  useEffect(async () => {
    try {
      try {
        const x = await apiHandler('get', `users/contactpersons`);
        //console.log(x.data);
        setUsers(x.data)
      } catch (error) {
        const x = await tokenHandler('get', `users/contactpersons`, sessionStorage.getItem('refreshToken'), apiHandler);
        setUsers(x.data)
      }
    }
    catch {
      navigate('/');
    }
  }, [])

  users.map((user) => {
    const obj = { value: `${user.id}`, label: `${user.name}` }
    options.push(obj)
  })

  const handleSubmit = async (event) => {

    event.preventDefault()
    setEvents(values => ({ ...values, "updated_by": id }))
    // setSubmitted(true)


    // axios   
    //      .put(`http://localhost:4000/events/${eventid}`,events)
    //      .then(response => {
    //          setEvents(response.data)
    //          alert(`${events.title} updated successfully`)
    //      })
    //      .catch(error => {
    //          console.log(error)
    //      })


    // const x = await apiHandler('put',`events/${eventid}`)
    // //console.log(x.data);
    // setUsers(x.data)

    // try {
    //   try {
    //     const x = await apiHandler('put', `events/${eventid}`);
    //     //console.log(x.data);
    //     setUsers(x.data)
    //   } catch (error) {
    //     const x = await tokenHandler('put', `events/${eventid}`, sessionStorage.getItem('refreshToken'), apiHandler);
    //     setUsers(x.data)
    //   }
    // }
    // catch {
    //   navigate('/');
    // }
    var config = {
      method: 'put',
      url: `http://localhost:4000/events/${props.eventid}`,
      data : events,
      headers: { 
        'Authorization': `Bearer ${sessionStorage.getItem('myToken')}`, 
        'Content-Type': 'application/json'
      }
    };
  axios(config)
//  axios  

//            .put(`http://localhost:4000/events/${eventid}`,events)

           .then(response => {

               setEvents(response.data)

               alert(`${events.title} updated successfully`)

           })

           .catch(error => {

               console.log(error)

           })



     

          const x = await apiHandler('put',`events/${props.eventid}`)

          //console.log(x.data);

          setUsers(x.data)


  }

  const handleReset = () => {
    // console.clear()
    console.log(props.eventid)
    var modal = document.getElementById("myUpdateModal");
    modal.style.display = "none";
    // setSubmitted(false)
  }
  
  return (
    <div className="createEventForm">
      <EventForm
        events={events}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleReset={handleReset}
        users={options}
        buttonValue="Update"
        updated_by={id}
        eventid={props.eventid}
        disabled={true} />
    </div>
  )
}

export default EditEventForm;