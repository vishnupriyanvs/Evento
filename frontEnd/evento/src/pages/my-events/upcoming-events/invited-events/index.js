import React, { useState, useEffect } from "react";
import SizedBox from "../../../../components/sized-box";
import "./index.css";
import { useNavigate } from "react-router-dom";
import MyEventsTable from "../../../../components/my-events-table";
import services from "../../../../constants";
import apiHandler from "../../../../api-handling";
import { useParams } from "react-router-dom";
import tokenHandler from "../../../../api-handling/tokenHandler";

function InvitedEvents(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);

  useEffect(async () => {
    try {
      try {
        const x = await apiHandler(
          "get",
          `invitations/response/Active/NotResponded/${id}`
        );
        setEvents(x.data);
      } catch (error) {
        const x = await tokenHandler(
          "get",
          `invitations/response/Active/NotResponded/${id}`,
          sessionStorage.getItem("refreshToken"),
          apiHandler
        );
        setEvents(x.data);
      }
    } catch {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (event) => {
    const value = event.target.value;

    try {
      try {
        const x = await apiHandler("put", `invitations/${events[0].id}`, {
          invitationResponse: value,
        });
        console.log(x.data);
        setEvents(x.data);
      } catch (error) {
        const x = await apiHandler(
          "put",
          `invitations/${events[0].id}`,
          { invitationResponse: value },
          sessionStorage.getItem("refreshToken"),
          apiHandler
        );
        console.log(x.data);
        setEvents(x.data);
      }
    } catch {
      navigate("/");
    }
    window.location.reload(false);
  };

  return (
    <>
      <p>{props.toptitle}</p>
      <div className="upcomingEventsTable">
        <SizedBox height="2vh" />
        <MyEventsTable
          titles={['Event-Titles', 'Start Date', 'End Date', 'Status', 'Actions']}
          events={events}
          handleSubmit={handleSubmit}
          // onClick={navigateToEvent(events.id)}
          // onClick = {() => navigate(`../view-event/${id}/${events.id}`)}
          // onClick ={mapping}
          myEventType={services.myEventType.UPCOMING_EVENT.INVITED_EVENT}
        />
      </div>
    </>
  );
}

export default InvitedEvents;
