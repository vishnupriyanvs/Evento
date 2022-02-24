import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import ViewEvents from "../pages/event-details";
import MainPage from "../pages";
import UsersMainPage from "../pages/my-events/main";
import Login from "../pages/login";
import PastEvents from "../pages/past-events";
import UpcomingEvents from "../pages/upcoming-events";
import InvitedEvents from "../pages/my-events/upcoming-events/invited-events";
import AcceptedEvents from "../pages/my-events/upcoming-events/accepted-events";
import RejectedEvents from "../pages/my-events/upcoming-events/rejected-events";
import PastRejectedEvents from "../pages/my-events/past-events/rejected-events";
import PastAcceptedEvents from "../pages/my-events/past-events/accepted-events";
import UserCancelledEvents from "../pages/my-events/cancelled-events";
import UserOnGoingEvents from "../pages/my-events/ongoing-events";
import CancelledEvents from "../pages/cancelled-events";
import CreateEventForm from "../pages/create-event-form";
import EditEventForm from "../pages/edit-event-form";
import Home from "../pages/home";

import AdminAccess from "../pages/temp-login";
import OngoingEvents from "../pages/ongoing-events";
import {InviteUser} from "../pages/send-invitations"
import AdminCalenderEvents from "../pages/calendar-admin";
import UserCalendarEvents from "../pages/my-events/calendar-users";
import SwitchContext from "../components/context/switchuser";



function Paths() {
    const [switchUser,setSwitchUser] = useState(0);


    return (
        <SwitchContext.Provider value ={{switchUser,setSwitchUser}}>
        <BrowserRouter>


            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/user" element={<MainPage />} >
                
                    <Route index element={<Home />} />
                    <Route path="upcoming-events/:id" element={<UpcomingEvents toptitle='Upcoming Events'/>} />
                    <Route path="ongoing-events/:id" element={<OngoingEvents toptitle='Ongoing Events'/>} />
                    <Route path="past-events/:id" element={<PastEvents toptitle='Past Events'/>} />
                    <Route path="cancelled-events/:id" element={<CancelledEvents toptitle='Cancelled Events'/>} />
                    <Route path="calender-events/:id" element={<AdminCalenderEvents />} />
                    <Route path="view-event/:id/:eventid" element={<ViewEvents />} />
                    <Route path="create-event/:id" element={<CreateEventForm />} />
                    <Route path="edit-event/:id/:eventid" element={<EditEventForm />} />
                    <Route path="sendinvitations/:id/:eventid" element={<InviteUser />} />
                    <Route path="temp/:id" element = {<AdminAccess />} />

                </Route>
                
                <Route path="/user/my-events" element={<UsersMainPage/>} >
                    <Route path="upcoming-events/invited/:id" element={<InvitedEvents toptitle='My Upcoming Events/Invited'/>} />
                    <Route path="upcoming-events/accepted/:id" element={<AcceptedEvents toptitle='My Upcoming Events/Accepted'/>} />
                    <Route path="upcoming-events/rejected/:id" element={<RejectedEvents toptitle='My Upcoming Events/Rejected'/>} />
                    <Route path="past-events/rejected/:id" element={<PastRejectedEvents toptitle='My Past Events/Rejected'/>} />
                    <Route path="past-events/accepted/:id" element={<PastAcceptedEvents toptitle='My Past Events/Accepted'/>} />
                    <Route path="cancelled-events/:id" element={<UserCancelledEvents toptitle='My Cancelled Events'/>} />
                    <Route path="ongoing-events/:id" element={<UserOnGoingEvents toptitle='My Ongoing Events'/>} />
                    <Route path= "calendar-events/:id" element={<UserCalendarEvents/>} />
                </Route>


            </Routes>
        </BrowserRouter>
        </SwitchContext.Provider>
    )
}

export default Paths;