import React, { useRef,useState,useEffect } from 'react';
import emailjs from 'emailjs-com';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import {Form} from 'react-bootstrap'

export  const InviteUser = () => {
  const form = useRef();


  const {id,eventid} = useParams();
  const [events,setEvents] = useState({});
  const [users,setUsers] = useState([]);
  const [groups,setGroups] = useState([]);
  let [invitee,setInvitee] = useState({"eventId" : eventid});
  let [groupInviteeAssign,setGroupInviteeAssign] = useState({})

  
  const options = [];
  const inviteesArray = [];
  const optionsGroup = [];
 

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
  

  useEffect(() => {
    axios.get(`http://localhost:4000/jobTitles/`)
      .then(response => {
        setGroups(response.data)
      })
      .catch(error =>{
        console.log(error)
      })
  },[])


users.map((user) => {
  const obj = {value : `${user.email}`, key : `${user.id}` , label: `${user.name}`}
  options.push(obj)
});


groups.map((groupmail) => {
  const obj = {value : `${groupmail.id}`, label: `${groupmail.title}`}
  optionsGroup.push(obj)
})

const options2 = []
groups.map((job) => {
  const name = 'value'
  let groupInvitee = []
  let groupInviteeId = []
  users.map((user) => {
    if(job.id == user.jobTitleId){
      groupInvitee.push(user.email)
      groupInviteeId.push(user.id)
    }
  })
  groupInviteeAssign = {label : `${job.title}`,[name] : groupInvitee, key : groupInviteeId}
  options2.push(groupInviteeAssign)
})


function handleChange(event){
  console.log(event)
    const name = 'userId'
    event.forEach((newevent,index) => {
          const value = newevent.key
          invitee = {...invitee,[name]:value}
          inviteesArray.push(invitee)
      }) 
    }
  
    
    function handleChangeGroup(event){
        const name = 'userId'
        event.forEach((newevent,index) => {
          console.log(newevent.key)
          newevent.key.forEach((id) => {
            const value = id
            invitee = {...invitee,[name]:value}
            inviteesArray.push(invitee)
          })
          })
          console.log(inviteesArray)
          } 
  

  const sendEmail = (e) => {
    e.preventDefault();
    console.log(form.current)
    emailjs.sendForm('gmail_try', 'template_gmail_try', form.current, 'user_drLq450jZbjUn4iK1PeZw')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      
    
    const uniqueInviteesArray = Array.from(inviteesArray.reduce((map, obj)=> map.set(obj.userId, obj), new Map()).values())

    axios.post(`http://localhost:4000/invitations/`,uniqueInviteesArray)
        .then(response => {
         alert(`Invitation sent successfully`)
      })
      .catch(error => {
          console.log(error)
      })
      
  };
  

const [typeOfInvitation,setTypeOfInvitation] = useState() 
  function invitationsFor(event){
    const type = event.target.id
    setTypeOfInvitation(type)
    event.preventDefault()
  }


  return (
    <Form ref={form} onSubmit={sendEmail}>
      <Form.Label>Event Title</Form.Label>
      <Form.Control type="text" name="event_title" value={events.title}></Form.Control>
      <br/>
      <Form.Label>Description</Form.Label>
      <Form.Control type="text" name="description" value={events.description}></Form.Control>
      <br/>
      <Form.Label>Send Invitation To :</Form.Label>
      <Form.Check
        inline
        type='radio'
        id = 'group'
        name = 'invitation'
        label = 'Select Specific Group' 
        onChange = {invitationsFor}
      /> 
      <Form.Check
        inline
        type='radio'
        id = 'individual'
        name = 'invitation'
        label = 'Select Individual user' 
        onChange = {invitationsFor}
      /> 
      <br />
      <>
      {
        
        typeOfInvitation == 'individual' ? 
          <>
            <Form.Label>Add User Email</Form.Label>
                <Select 
                  id="email" 
                  name="email" 
                  onChange={handleChange} 
                  options = {options}
                  isMulti = {true}
                  value = {options.email} />
          </>
        :
          null
      }
      {
        typeOfInvitation == 'group' ? 
          <>
            <Form.Label>Choose Group</Form.Label>
                <Select 
                  id="email" 
                  name="email" 
                  onChange={handleChangeGroup} 
                  options = {options2}
                  isMulti = {true}
                  value = {options2.value} />
          </>
        :
        null
      }
      </> 
      <Form.Label>Message</Form.Label>
      <Form.Control type="textarea" name="message" row="5"/>
      <br/><br/>
      <Form.Control type="submit" value="Send" />
    </Form>
  );
};