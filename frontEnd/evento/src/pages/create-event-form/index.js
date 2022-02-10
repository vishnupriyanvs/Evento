import axios from 'axios'
import React, { useState, useEffect } from 'react'
import EventForm from "../../components/event-form";
import './index.css'

import { useParams } from 'react-router-dom';

function CreateEventForm() {
    const { id } = useParams()


    const [events, setEvents] = useState({})
    const [users, setUsers] = useState([])
    const [file, setFile] = useState(null);
    const [filename, setFileName] = useState()
    const options = []


    function handleChange(event) {
        console.log(event)
        console.log(event.name)
        let name, value;
        if (event.name == 'contact_person') {
            name = event.name
            value = event.value
        }
        else {
            name = event.target.name
            value = event.target.value
        }
        setEvents(values => ({ ...values, [name]: value }))
    }

    function handleFileChange(event) {
        setFile(event.target.files[0])
        setFileName(event.target.files[0].name)
    }
    console.log('line 23' + events)
    useEffect(() => {
        axios
            .get("http://localhost:4000/users/contactpersons")
            .then((response) => {
                setUsers(response.data);
            });
    }, []);

    users.map((user) => {
        const obj = { value: `${user.id}`, label: `${user.name}`, name: 'contact_person' }
        options.push(obj)
    })



    const handleSubmit = (event) => {
        
        event.preventDefault()
        const formData = new FormData()
        formData.append('avatar', file);
        var config = {
            method: 'post',
            url: 'http://localhost:4000/images/upload',
            data: formData
        };
        setEvents(values => ({ ...values, "created_by": id, "updated_by": id }))
        console.log(events.created_by + 'helo')

        axios
            .post('http://localhost:4000/events/', events)
            .then(async response => {
                setEvents(response.data);
                console.log(response.data.id);
                formData.append('eventid', response.data.id)
                config.url = `http://localhost:4000/images/upload/${response.data.id}`
                const x = await axios(config);
                console.log(x.data)
                alert(`${events.title} added successfully`)
            })
            .catch(error => {
                console.log(error)
            })
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
                handleFileChange={handleFileChange}
                handleReset={handleReset}
                users={options}
                buttonValue="Create Event"
                created_by={id} />
        </div>
    )
}

export default CreateEventForm;