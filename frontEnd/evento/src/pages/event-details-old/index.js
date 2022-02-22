import React from "react";
import SizedBox from "../../components/sized-box";
import EventContactDetails from "./event-contact-info";
import EventDesc from "./event-desc";
import "./index.css";

function ViewEvents() {
  return (
    <div className="event-container-width">
      <SizedBox height="5vh" width="100%" />
      <div className="event-details-container">
        <div className="event-desc">
          <EventDesc />
        </div>

        <div className="event-contact-a">Contact</div>
        <div className="event-contact-b">Contact</div>
        <div className="event-invitees">
          <div class="event-invitees-container">
            <SizedBox width="40vh" />
            <div>Invitees</div>
          </div>
        </div>

        <div className="event-participants">
          <div class="event-participants-container">
            <SizedBox width="40vh" />
            <div>Participants</div>
          </div>
        </div>

        <div className="event-participants-list-container">
          <div className="event-participant-list">
            <SizedBox width="60vh" />
            Participant list
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewEvents;
