import axios from "axios";
import React, { useState, useEffect } from "react";
import EventForm from "../../components/event-form";
import "./index.css";
import { useParams, useNavigate } from "react-router-dom";
import apiHandler from "../../api-handling";
import tokenHandler from "../../api-handling/tokenHandler";
import { toast, Slide } from "react-toastify";
import { useToastBox } from "../../components/toast";

function EditEventForm(props) {
  const { id, eventid } = useParams();
  const { handleSuccessToast, handleErrorToast } = useToastBox();
  const [events, setEvents] = useState({ updated_by: id });
  const [users, setUsers] = useState([]);
  const options = [];
  const navigate = useNavigate();
  const [isModal, setModal] = useState(true);
  // const [submitted,setSubmitted] = useState(false)

  function handleContactPerson(event) {
    console.log(event);

    let name, value;

    name = "contact_person";
    value = event.value;

    console.log(name + value);
    setEvents((values) => ({ ...values, [name]: value }));
    console.log(events);
  }

  function handleChange(event) {
    let name, value;
    name = event.target.name;
    value = event.target.value;

    //console.log(event.target.name, event.target.value)
    //Start Date Validation
    if (event.target.name === "startDate") {
      var today = new Date();
      const selectDate = new Date(event.target.value);
      if (selectDate < today) {
        alert("Please enter a valid date");
        event.target.value = null;
        return false;
      }
    }

    //End Date Validation
    if (event.target.name === "endDate") {
      var today = new Date();
      const tempDate = document.getElementById("start-date").value;
      const startDate = new Date(tempDate);
      const selectDate = new Date(event.target.value);
      if (selectDate < today || selectDate < startDate) {
        alert("Please enter a valid date");
        event.target.value = null;
        return false;
      }
    }
    //Start Time Validation
    if (event.target.name === "endTime") {
      const tempStartDate = document.getElementById("start-date").value;
      const tempEndDate = document.getElementById("end-date").value;
      const tempStartTime = document.getElementById("start-time").value;
      const tempEndTime = event.target.value;

      if (tempEndDate === tempStartDate) {
        if (tempStartTime === tempEndTime) {
          alert("Please enter a valid time");
          event.target.value = null;
          return false;
        }
        if (tempStartTime > tempEndTime) {
          alert("Please enter a valid time");
          event.target.value = null;
          return false;
        }
      }
    }

    setEvents((values) => ({ ...values, [name]: value }));
    console.log(events);
  }
  
  useEffect(async () => {
    try {
      try {
        const x = await apiHandler("get", `events/${props.eventid}`);
        //console.log(x.data);
        setEvents(x.data);
      } catch (error) {
        const x = await tokenHandler(
          "get",
          `events/${props.eventid}`,
          sessionStorage.getItem("refreshToken"),
          apiHandler
        );
        setEvents(x.data);
      }
    } catch {
      navigate("/");
    }
  }, [props.eventid]);

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
        const x = await apiHandler("get", `users/contactpersons`);
        //console.log(x.data);
        setUsers(x.data);
      } catch (error) {
        const x = await tokenHandler(
          "get",
          `users/contactpersons`,
          sessionStorage.getItem("refreshToken"),
          apiHandler
        );
        setUsers(x.data);
      }
    } catch {
      navigate("/");
    }
  }, []);

  users.map((user) => {
    const obj = { value: `${user.id}`, label: `${user.name}` };
    options.push(obj);
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(id);
    setEvents((values) => ({ ...values, updated_by: id }));

    console.log(events);
    var config = {
      method: "put",
      url: `http://localhost:4000/events/${props.eventid}`,
      data: events,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("myToken")}`,
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then((response) => {
        handleSuccessToast(`${events.title} updated successfully`);
        setEvents(response.data);
        var modal = document.getElementById("myUpdateModal");
        modal.style.display = "none";
        refresh();
        // handleSuccessToast(`${events.title} updated successfully`);
        // setModal(false);
      })

      .catch((error) => {
        console.log(error);
      });

    const x = await apiHandler("put", `events/${props.eventid}`);
    setUsers(x.data);
  };


  function refresh() {
    window.location.reload()
  }

  const handleReset = () => {
    // console.clear()
    //console.log(props.eventid)
    var modal = document.getElementById("myUpdateModal");
    modal.style.display = "none";
    // setSubmitted(false)
  };

  return (
    <div className="createEventForm">
      <EventForm
        formTitle={"Edit Event"}
        events={events}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleReset={handleReset}
        handleContactPerson={handleContactPerson}
        users={options}
        buttonValue="Update"
        updated_by={id}
        eventid={props.eventid}
        disabled={true}
      />
    </div>
  );
}

export default EditEventForm;
