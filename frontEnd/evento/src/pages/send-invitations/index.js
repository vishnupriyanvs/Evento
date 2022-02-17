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

  
  const options = [];
  const inviteesArray = [];
  const optionsGroup = [];
 

  // useEffect(() => {
  //   axios.get(`http://localhost:4000/events/${eventid}`)
  //     .then(response => {
  //       setEvents(response.data);
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     })
  // },[])

 
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
  // useEffect(() => {
  //   axios.get(`http://localhost:4000/users`)
  //     .then(response => {
  //       setUsers(response.data)
  //     })
  //     .catch(error => {
  //       console.log(error)
  //     })
  // },[])
 


  useEffect(async () => {
    try{
      try {
        const x = await apiHandler('get',`users`);
        //console.log(x.data);
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
  
  

  // useEffect(() => {
  //   axios.get(`http://localhost:4000/jobTitles/`)
  //     .then(response => {
  //       setGroups(response.data)
  //     })
  //     .catch(error =>{
  //       console.log(error)
  //     })
  // },[])
 

  useEffect(async () => {
    try{
      try {
        const x = await apiHandler('get',`jobTitles`);
        //console.log(x.data);
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
  

  const sendEmail = async (e) => {
    e.preventDefault();
    console.log(form.current)
    emailjs.sendForm('gmail_try', 'template_gmail_try', form.current, 'user_drLq450jZbjUn4iK1PeZw')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      
    
    const uniqueInviteesArray = Array.from(inviteesArray.reduce((map, obj)=> map.set(obj.userId, obj), new Map()).values())

    // axios.post(`http://localhost:4000/invitations/`,uniqueInviteesArray)
    //     .then(response => {
    //      alert(`Invitation sent successfully`)
    //   })
    //   .catch(error => {
    //       console.log(error)
    //   })
      const x = await apiHandler('get',`invitations`,uniqueInviteesArray)
      //console.log(x.data);
      alert('Invitation sent successfully');
  };
  

const [typeOfInvitation,setTypeOfInvitation] = useState() 
  function invitationsFor(event){
    const type = event.target.id
    setTypeOfInvitation(type)
    event.preventDefault()
  }


  return (
    <div class="form-bg">
    <Form ref={form} onSubmit={sendEmail}>
      <div class='title-class'>
      <Form.Label>Event Title</Form.Label>
      <Form.Control  id = 'title-name' type="text" name="event_title" value={events.title}></Form.Control>
      <br/>
      </div>
      <div class='description-class'>
      <Form.Label>Description</Form.Label>
      <Form.Control id='description-title' type="textarea" name="description" value={events.description}  ></Form.Control>
      <br/>
      </div>
      <div class='invitation'>
      <Form.Label>Send Invitation To :</Form.Label>
      <br />
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
      </div>
      <div class='message'>
      <Form.Label>Message</Form.Label>
      <Form.Control type="textarea" name="message" row="5"/>
      <br/><br/>
      </div>
      <div class = 'submit-button'>
      <Form.Control type="submit" value="Send" />
      </div>
      {/* <Button type='reset' variant='danger' >Cancel</Button> */}
      <div class = 'cancel-button'>
      <Form.Control type='reset' variant='danger' value="Cancel"/>
      </div>
    </Form>
    </div>
  );
};