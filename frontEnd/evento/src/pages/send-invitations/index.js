import React, { useRef,useState,useEffect } from 'react';
import emailjs from 'emailjs-com';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export  const InviteUser = () => {
  const form = useRef();

  const {id,eventid} = useParams();
  const [events,setEvents] = useState({});
  const [users,setUsers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:4000/events/${eventid}`)
      .then(response => {
        console.log('promise executed successfully')
        console.log(response)
        setEvents(response.data);
        console.log(events)
      })
      .catch(error => {
        console.log(error);
      })
  },[])

  useEffect(() => {
    axios.get(`http://localhost:4000/users`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.log(error)
      })
  },[])

  // console.log(events.title)
  // console.log(users)
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('gmail_try', 'template_gmail_try', form.current, 'user_drLq450jZbjUn4iK1PeZw')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <label>Event Title</label>
      <input type="text" name="event_title" value={events.title}></input>
      <br/>
      <label>Description</label>
      <input type="text" name="description" value={events.description}></input>
      <br/>
      {/* <label>Name</label>
      <input type="text" name="user_name" /> */}
      
      <label>Add User Email</label>
      <select id="email" name="email" multiple>
        <optgroup label="Add Invitee">
          {users.map((user) => (
              <option id = "users-list"  value = {user.email} key = {user.id} >{console.log(user.email)}{user.name}</option>
          ))}
         </optgroup></select>

      <br/>
      <label>Message</label>
      <textarea name="message" />
      <input type="submit" value="Send" />
    </form>
  );
};