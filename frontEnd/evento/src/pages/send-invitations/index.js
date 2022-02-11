import React, { useRef,useState,useEffect } from 'react';
import emailjs from 'emailjs-com';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import {Form,Button} from 'react-bootstrap'

export  const InviteUser = () => {
  const form = useRef();

  const {id,eventid} = useParams();
  const [events,setEvents] = useState({});
  const [users,setUsers] = useState([]);
  const [groups,setGroups] = useState([]);
  let [invitee,setInvitee] = useState({"eventId" : eventid});
  
  const options = [];
  const inviteesArray = [];
 

  useEffect(() => {
    axios.get(`http://localhost:4000/events/${eventid}`)
      .then(response => {
        setEvents(response.data);
      })
      .catch(error => {
        console.log(error);
      })
  },[])

  useEffect(() => {
    axios.get(`http://localhost:4000/users`)
      .then(response => {
        setUsers(response.data)
      })
      .catch(error => {
        console.log(error)
      })
  },[])
  console.log(users)

  useEffect(() => {
    axios.get(`http://localhost:4000/groupmails/`)
      .then(response => {
        setGroups(response.data)
      })
      .catch(error =>{
        console.log(error)
      })
  },[])


users.map((user) => {
  const obj = {value : `${user.email}`, key : `${user.id}` , label: `${user.name}`,groupmail: false}
  options.push(obj)
});

groups.map((groupmail) => {
  const obj = {value : `${groupmail.mail}`, key : `${groupmail.id}` , label: `${groupmail.name}`,groupmail:true}
  options.push(obj)
})

console.log(options);

function handleChange(event){
  console.log(event)
    const name = 'userId'
    event.forEach((newevent,index) => {
      console.log(newevent)
        if(newevent.groupmail) 
          console.log('hi')
        else{
          const value = newevent.key
          invitee = {...invitee,[name]:value}
          inviteesArray.push(invitee)
        }
      }) 
    }
  

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs.sendForm('gmail_try', 'template_gmail_try', form.current, 'user_drLq450jZbjUn4iK1PeZw')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      
     console.log(form)
    const uniqueInviteesArray = Array.from(inviteesArray.reduce((map, obj)=> map.set(obj.userId, obj), new Map()).values())

    axios.post(`http://localhost:4000/invitations/`,uniqueInviteesArray)
        .then(response => {
         alert(`Invitation sent successfully`)
      })
      .catch(error => {
          console.log(error)
      })
      
  };
  

  return (
    <Form ref={form} onSubmit={sendEmail}>
      <Form.Label>Event Title</Form.Label>
      <Form.Control type="text" name="event_title" value={events.title}></Form.Control>
      <br/>
      <Form.Label>Description</Form.Label>
      <Form.Control type="text" name="description" value={events.description}></Form.Control>
      <br/>
      <Form.Label>Add User Email</Form.Label>
      <Select 
        id="email" 
        name="email" 
        onChange={handleChange} 
        options = {options}
        isMulti = {true}
        value = {options.email} />
      <br/>
      <Form.Label>Message</Form.Label>
      <Form.Control type="textarea" name="message" row="5"/>
      <br/><br/>
      <Form.Control type="submit" value="Send" />
    </Form>
  );
};