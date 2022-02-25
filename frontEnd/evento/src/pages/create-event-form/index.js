import React, { useState, useEffect } from "react";
import EventForm from "../../components/event-form/index_ACTUAL";
import "./index.css";
import apiHandler from "../../api-handling";
import { useParams, useNavigate } from "react-router-dom";
import tokenHandler from "../../api-handling/tokenHandler";

function CreateEventForm(props) {

  console.log(props)
  const { id } = useParams();
  const [events, setEvents] = useState({created_by: id, updated_by: id });
  const [users, setUsers] = useState([]);
  const [file, setFile] = useState(null);
  const [filename, setFileName] = useState();
  const options = [];
  const navigate = useNavigate();

  function handleContactPerson(event) {
    let name, value;
    name = event.name;
    value = event.value;
    setEvents((values) => ({ ...values, [name]: value }));
  }

  function handleChange(event) {
    let name, value;
    name = event.target.name;
    value = event.target.value;
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
  }

  function handleFileChange(event) {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name);
  }

  useEffect(async () => {
    try {
      try {
        const x = await apiHandler("get", `users/contactpersons`);
        setUsers(x.data);
      } catch (err) {
        const x = await tokenHandler(
          "get",
          `users/contactpersons`,
          sessionStorage.getItem("refreshToken"),
          apiHandler
        );
        setUsers(x.data);
      }
    } catch (err) {
      navigate("/");
    }
  }, []);

  users.map((user) => {
    const obj = {
      value: `${user.id}`,
      label: `${user.name}`,
      name: "contact_person",
    };
    options.push(obj);
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("avatar", file);
    setEvents((values) => ({ ...values, created_by: id, updated_by: id }));

    const response = await apiHandler("post", `events`, events);
    setEvents(response.data);
    const imageResponse = await apiHandler(
      "post",
      `images/upload/${response.data.id}`,
      formData
    );
    console.log(events)
    alert('EVent added')
  };

  const handleReset = () => {
    console.clear();
  };

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
        created_by={id}
        show = {props.show}
        
      />
    </div>
  );
}

export default CreateEventForm;
