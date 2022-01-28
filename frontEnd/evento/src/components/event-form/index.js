import React from "react";
import './index.css';


function EventForm() {

    return (
        <div className="form-style-5">
            <form>
                <fieldset>
                    <input type="text" name="field1" placeholder="Your Name *" />
                    {/* <input type="email" name="field2" placeholder="Your Email *"/> */}
                    <textarea name="field3" placeholder="Event Description" rows="5"></textarea>
                    <div className="formTable">
                        <div className="formRow">
                            <div className="formCol">
                                <div>Start Date</div>
                                <input type="date" name="start-date" placeholder="Start Date *" />
                            </div>
                            <div className="formCol">
                                <div>End Date</div>
                                <input type="date" name="end-date" placeholder="End Date *" />
                            </div>
                        </div>

                        <div className="formRow">
                            <div className="formCol">
                                <div>Venue</div>
                                <input type="text" name="start-date" placeholder="Venue" />
                            </div>
                            <div className="formCol">
                                <div>Image</div>
                                <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg" />
                            </div>
                        </div>

                        <div className="formRow">
                            <div className="formCol">
                                <div>Resource Person</div>
                                <input type="text" name="start-date" placeholder="Name of resource person" />
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
                                <input type="url" name="website-url" placeholder="url of websites" />
                            </div>
                            <div className="formCol">
                                <div>Event Status</div>
                                <select id="job" name="field4" >
                                    <option value="Active">Active</option>
                                    <option value="Inactive">Inactive</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </fieldset>

                <div className="formRowBtn">

                    <input type="submit" value="Create" id="createBtn" />
                    <input type="submit" value="Cancel" id="cancelBtn" />

                </div>

            </form>
        </div>
    )
}

export default EventForm;