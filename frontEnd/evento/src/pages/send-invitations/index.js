import React, { useRef,useState,useEffect } from 'react';
import emailjs from 'emailjs-com';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import {Form,Button} from 'react-bootstrap'
import './index.css'
import apiHandler from '../../api-handling';
import tokenHandler from '../../api-handling/tokenHandler';

export  const InviteUser = () => {
  
  const form = useRef();
  const navigate = useNavigate();
  const {id,eventid} = useParams();
  const [events,setEvents] = useState({});
  const [users,setUsers] = useState([]);
  const [groups,setGroups] = useState([]);
  let [invitee,setInvitee] = useState({"eventId" : eventid});
  let [groupInviteeAssign,setGroupInviteeAssign] = useState({})
  const [typeOfInvitation,setTypeOfInvitation] = useState('individual') 
  const options = [];
  const inviteesArray = [];
  const optionsGroup = [];
  const options2 = [];
 
  // Getting event details from backend
  useEffect(async () => {
    try{
      try {
        const x = await apiHandler('get',`events/${eventid}`);
        //console.log(x.data);
        setEvents(x.data);
    } catch (error) {
        const x = await tokenHandler('get',`events/${eventid}`,sessionStorage.getItem('refreshToken'),apiHandler);
        setEvents(x.data);
    }
    }
    catch{
      navigate('/');
    }
  },[])

  // Getting users details from backend
  useEffect(async () => {
    try{
      try {
        const x = await apiHandler('get',`users`);
        setUsers(x.data);
    } catch (error) {
        const x = await tokenHandler('get',`users`,sessionStorage.getItem('refreshToken'),apiHandler);
        setUsers(x.data);
    }
    }
    catch{
      navigate('/');
    }
  },[])
  
   
  //Getting jobTitles details from backend
  useEffect(async () => {
    try{
      try {
        const x = await apiHandler('get',`jobTitles`);
        setGroups(x.data);
    } catch (error) {
        const x = await tokenHandler('get',`jobTitles`,sessionStorage.getItem('refreshToken'),apiHandler);
        setGroups(x.data);
    }
    }
    catch{
      navigate('/');
    }
  },[])
  

//Converting user options for Select
users.map((user) => {
  const obj = {value : `${user.email}`, key : `${user.id}` , label: `${user.name}`}
  options.push(obj)
});

//Converting jobtitle options for Select
groups.map((groupmail) => {
  const obj = {value : `${groupmail.id}`, label: `${groupmail.title}`}
  optionsGroup.push(obj)
})

//Appending userid to an array
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
  
  //Sending email function
  const sendEmail = async (e) => {
    e.preventDefault();
    console.log(form.current)
    emailjs.sendForm('gmail_try', 'template_gmail_try', form.current, 'user_drLq450jZbjUn4iK1PeZw')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      
    //This is to remove duplicates from the array
    const uniqueInviteesArray = Array.from(inviteesArray.reduce((map, obj)=> map.set(obj.userId, obj), new Map()).values())
    
    //Pushing data to backend tables
    const x = await apiHandler('post',`invitations`,uniqueInviteesArray)
    alert('Invitation sent successfully');
  };
  



function invitationsFor(event){
  event.stopPropagation()
    const type = event.target.id
    setTypeOfInvitation(type)
   
  }


  return (
    <div class="form-bg">
    <Form ref={form} onSubmit={sendEmail}>
      <div class='title-class'>
      <Form.Label class='left-aligned'>Event Title</Form.Label>
      <Form.Control  id = 'title-name' type="text" name="event_title" value={events.title}></Form.Control>
      <br/>
      </div>
      <div class='description-class'>
      <Form.Label class='left-aligned'>Description</Form.Label>
      <Form.Control id='description-title' type="textarea" name="description" value={events.description} ></Form.Control>
      <br/>
      </div>
      <div class='invitation'>
      <Form.Label class='left-aligned'>Send Invitation To :</Form.Label>
      <br />
      <Form.Check
        inline
        type='radio'
        id = 'group'
        name = 'invitation'
        label = 'Select Specific Group' 
        onChange = {invitationsFor}
        checked = {typeOfInvitation === 'group'}
      /> 
      <Form.Check
        inline
        type='radio'
        id = 'individual'
        name = 'invitation'
        label = 'Select Individual user' 
        onChange = {invitationsFor}
        checked = {typeOfInvitation === 'individual'}
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
                  value = {options.email}
                   />
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
      </div>
      <div class='message'>
      <Form.Label class='left-aligned'>Message</Form.Label>
      <Form.Control id="message-area" type="textarea" name="message" row="5"/>
      <br/><br/>
      </div>
      <div class = 'submit-button'>
      <Form.Control id='submit-button' type="submit" value="Invite" />
      </div>
      <div class = 'cancel-button'>
      <Form.Control id='cancel-button' type='reset'  value="Cancel"/>
      </div>
    </Form>
    </div>
  )
};