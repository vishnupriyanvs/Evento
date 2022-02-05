import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CalenderEvents from "../pages/calender-events";
import ViewEvents from "../pages/event-details";
import MainPage from "../pages";
import Login from "../pages/login";
import PastEvents from "../pages/past-events";
import UpcomingEvents from "../pages/upcoming-events";
import CancelledEvents from "../pages/cancelled-events";
import CreateEventForm from "../pages/create-event-form";
import EditEventForm from "../pages/edit-event-form";
import Home from "../pages/home";

import AdminAccess from "../pages/temp-login";
import OngoingEvents from "../pages/ongoing-events";
import {InviteUser} from "../pages/send-invitations"



function Paths() {



    return (
        <BrowserRouter>


            <Routes>

                <Route path="/" element={<Login />} />
                <Route path="/user" element={<MainPage />} >
                    <Route index element={<Home />} />
                    <Route path="upcoming-events/:id" element={<UpcomingEvents />} />
                    <Route path="ongoing-events/:id" element={<OngoingEvents />} />
                    <Route path="past-events/:id" element={<PastEvents />} />
                    <Route path="cancelled-events/:id" element={<CancelledEvents />} />
                    <Route path="calender-events" element={<CalenderEvents />} />
                    <Route path="view-event/:id/:eventid" element={<ViewEvents />} />
                    <Route path="create-event/:id" element={<CreateEventForm />} />
                    <Route path="edit-event/:id/:eventid" element={<EditEventForm />} />
                    <Route path="sendinvitations/:id/:eventid" element={<InviteUser />} />
                    <Route path="temp/:id" element = {<AdminAccess />} />

                </Route>



            </Routes>
        </BrowserRouter>
    )
}

export default Paths;