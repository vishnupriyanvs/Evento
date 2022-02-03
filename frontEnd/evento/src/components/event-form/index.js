import React from "react";
import './index.css';
import {Button} from 'react-bootstrap'


function EventForm(props) {
    console.log(props)
    return (
        <div className="form-style-5">
            <form onSubmit={props.handleSubmit}>
                <fieldset>
                    
                    <div className="formRow">
                        <div className="formColMain">
                        <div>Event Title</div>
                        <input 
                            type="text"
                            id = "event-title" 
                            name="title" 
                            value={props.events.title}
                            onChange={props.handleChange}
                            placeholder="Enter Event Title" />
                        </div>
                    </div>

                    <div className="formRow">
                        <div className="formColMain">
                        <div>Event Description</div>
                        <textarea 
                            rows="5"
                            id = "event-description" 
                            name="description" 
                            value={props.events.description}
                            onChange={props.handleChange}
                            placeholder="Event Description" />
                        </div>
                    </div>
                    
                    <div className="formTable">
                        <div className="formRow">
                            <div className="formCol">
                                <div>Start Date</div>
                                <input 
                                    type = "date" 
                                    id = "start-date"
                                    name ="startDate" 
                                    value = {props.events.startDate} 
                                    onChange={props.handleChange} />
                            </div>
                            <div className="formCol">
                                <div>End Date</div>
                                <input 
                                    type = "date" 
                                    id = "end-date"
                                    name ="endDate" 
                                    value = {props.events.endDate}
                                    onChange={props.handleChange} />
                            </div>
                        </div>

                        <div className="formRow">
                            <div className="formCol">
                                <div>Venue</div>
                                <input 
                                    type="text" 
                                    id = "venue"
                                    name ="venue" 
                                    value = {props.events.venue}
                                    onChange={props.handleChange} 
                                    placeholder="Enter Venue/Meeting Link" />
                            </div>
                            <div className="formCol">
                                <div>Image</div>
                                <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
                            </div>
                        </div>

                        <div className="formRow">
                            <div className="formCol">
                                <div>Resource Person</div>
                                <input 
                                    type="text" 
                                    id = "resource-person"
                                    name ="resourcePerson" 
                                    value = {props.events.resourcePerson}
                                    onChange={props.handleChange} 
                                    placeholder="Name of resource person" />
                            </div>
                            <div className="formCol">
                                <div>Contact Person</div>
                                <select id="job" name="field4" >
                                    <optgroup label="HR Admins">
                                        <option value="Suresh">Suresh</option>
                                        <option value="other_indoor">Ramesh</option>
                                    </optgroup></select>
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
                                <div>Event Status</div>
                                <select 
                                    id="event-status" 
                                    name="field4" >
                                    <option value="Active" >Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
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
    )
}

export default EventForm;