//Duplicate event for for modal try

import React,{useState} from "react";
import './index.css';
import {Button} from 'react-bootstrap';
import Select from 'react-select'
import { Modal, Alert} from 'react-bootstrap';


function EventForm(props) {
    //console.log(props)
    //console.log(new Date().getDate())

    //const [show, setShow] = useState(false);
    
    //const handleShow = () => setShow(true);
    const handleClose = () => props.show = false;

    function Today(){
        let today;
        if(new Date().getMonth() <10){
            today = `${new Date().getFullYear()}-0${new Date().getMonth()}-${new Date().getDate()}`
        }
        else{
            today = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}`
        }
        //console.log(today)
        return today;
    }
    Today()

    return (
        <Modal show={props.show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>
                Add Employee
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-style-5">
            <form onSubmit={props.handleSubmit}>
                <fieldset>
                    
                    <div className="formRow">
                        <div className="formColMain">
                        <div>Event Title<span className="mandatory">*</span></div>
                        <input 
                            type="text"
                            id = "event-title" 
                            name="title" 
                            value={props.events.title}
                            onChange={props.handleChange}
                            placeholder="Enter Event Title" 
                            disabled = {props.disabled} 
                            required />
                        </div>
                    </div>

                    <div className="formRow">
                        <div className="formColMain">
                        <div>Event Description<span className="mandatory">*</span></div>
                        <textarea 
                            rows="5"
                            id = "event-description" 
                            name="description" 
                            value={props.events.description}
                            onChange={props.handleChange}
                            placeholder="Event Description" 
                            disabled = {props.disabled}
                            required
                            />
                        </div>
                    </div>
                    
                    <div className="formTable">
                        <div className="formRow">
                            <div className="formCol">
                                <div>Start Date<span className="mandatory">*</span></div>
                                <input 
                                    type = "date" 
                                    id = "start-date"
                                    name ="startDate" 
                                    value = {props.events.startDate} 
                                    onChange={props.handleChange}
                                     required />
                            </div>
                            <div className="formCol">
                                <div>End Date<span className="mandatory">*</span></div>
                                <input 
                                    type = "date" 
                                    id = "end-date"
                                    name ="endDate" 
                                    value = {props.events.endDate}
                                    onChange={props.handleChange} 
                                    required />
                            </div>
                        </div>
                        <div className="formTable">
                        <div className="formRow">
                            <div className="formCol">
                                <div>Start Time<span className="mandatory">*</span></div>
                                <input 
                                    type = "time" 
                                    id = "start-time"
                                    name ="startTime" 
                                    value = {props.events.startTime} 
                                    onChange={props.handleChange}
                                     required />
                            </div>
                            <div className="formCol">
                                <div>End Time<span className="mandatory">*</span></div>
                                <input 
                                    type = "time" 
                                    id = "end-time"
                                    name ="endTime" 
                                    value = {props.events.endTime}
                                    onChange={props.handleChange} required />
                            </div>
                        </div>

                        <div className="formRow">
                            <div className="formCol">
                                <div>Venue<span className="mandatory">*</span></div>
                                <input 
                                    type="text" 
                                    id = "venue"
                                    name ="venue" 
                                    value = {props.events.venue}
                                    onChange={props.handleChange} 
                                    placeholder="Enter Venue/Meeting Link" required/>
                            </div>
                            <div className="formCol">
                                <div>Image</div>
                                <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" onChange={props.handleFileChange}/>
                            </div>
                        </div>

                        <div className="formRow">
                            <div className="formCol">
                                <div>Resource Person<span className="mandatory">*</span></div>
                                <input 
                                    type="text" 
                                    id = "resource-person"
                                    name ="resourcePerson" 
                                    value = {props.events.resourcePerson}
                                    onChange={props.handleChange} 
                                    placeholder="Name of resource person" required />
                            </div>
                            <div className="formCol">
                                <div>Contact Person<span className="mandatory">*</span></div>
                                <Select 
                                    id="contact-person" 
                                    name="contact_person"
                                    value = {props.events.contact_person} 
                                    //onChange={props.handleChange}
                                    options = {props.users}
                                    value={props.users.find(c => c.value === props.users.id)}
                                    onChange={props.handleContactPerson}
                                    required />
                                    {/* <optgroup label="Select Person">
                                        {props.users.map((user) => (
                                            <option 
                                                id = "contact-persons-list"
                                                value = {user.id}
                                                key = {user.id} >
                                            {user.name}
                                            </option>
                                        ))}
                                    </optgroup> */}
                                
                            </div>
                        </div>
                        <div className="formRow">
                            <div className="formCol">
                                <div>Website Details</div>
                                <input 
                                    type="url" 
                                    id = "website-url"
                                    name ="website" 
                                    value = {props.events.website}
                                    onChange={props.handleChange} 
                                    placeholder="Enter website details" />
                            </div>
                            <div className="formCol">
                                <div>Event Status<span className="mandatory">*</span></div>
                                <select 
                                    id="is-active" 
                                    name="isActive" 
                                    onChange={props.handleChange}>
                                    <option value="Active" default>Active</option>
                                    <option value="InProgress">InProgress</option>
                                </select>
                            </div>  
                        </div>

                        {/* <div className="formRow">
                            <div className="formCol">
                                <div>Created By</div>
                                <input 
                                    type="text" 
                                    id = "created-by"
                                    name ="created_by" 
                                    // onChange={props.handleChange}
                                    defaultValue={props.events.created_by || props.created_by}
                                    disabled
    
                                    />
                            </div>
                            <div className="formCol">
                                <div>Updated By</div>
                                <input 
                                    type="text" 
                                    id = "created-by"
                                    name ="created_by" 
                                    //onChange={props.handleChange}
                                    defaultValue={props.created_by || props.updated_by}
                                    disabled
                                    />
                            </div>  
                        </div> */}
                    </div>
                </div>
                </fieldset>

                {/* <div className="formRowBtn">

                    <input type="submit" value="Create" id="createBtn" />
                    <input type="submit" value="Cancel" id="cancelBtn" />

                </div> */}

                <div>
                    <Button type='submit' variant="primary">{props.buttonValue}</Button>
                    <Button type='reset' variant='danger' onClick={props.handleReset} >Cancel</Button>
                </div>

            </form>
        </div>
        </Modal.Body>
        <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close Button
                </Button>
        </Modal.Footer>
    </Modal>
    )
}

export default EventForm;