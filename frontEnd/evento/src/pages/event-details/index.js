import './index.css'



function ViewEvents() {



    return (
        <>
            <div className="cards-container">
                <div className="cards">
                    <img src="https://effectussoftware.com/blog/wp-content/uploads/2020/02/What-is-React-JS.jpg" />
                    <div className="contentss">
                        <div className='event-content'>
                            <div className='content-event-title'>LEARN REACT FOR FUN</div>
                            <div className='content-event-description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
                        </div>

                        <div className='event-fixture'>
                            <div className='content-event-date'>13-16 JUN 2022 <span>9.00 am - 12.00 pm</span></div>
                            <div className='content-event-venue'><a>Click here to join meeting</a></div>
                            <div className='content-event-contact-person'>NAVEEN VASUDEVA MENON</div>
                        </div>

                        <div className='content-event-further-info'>
                            <div>www.anniedoewebsite.com</div>
                            <div>Contact</div>
                        </div>
                    </div></div>

                <div className='event-invitees-participants'>
                    <div className='event-invitees'>
                        <div>Icon</div>
                        <div>
                            <b>Invitees</b>
                            <h1>80</h1>
                        </div>
                    </div>

                    <div className='event-participants'>
                        <div>Icon</div>
                        <div>
                            <b>Participants</b>
                            <h1>180</h1>
                        </div>
                    </div>
                </div>

                <div className='event-invitee-response'>
                    <div className='flex-table'>
                        <div className='flex-th'>
                            <div className='flex-th-content'>Invitees</div>
                            <div className='flex-th-content'>Response</div>
                        </div>

                        <div className='flex-tr'>
                            <div className='flex-td'>Nihal</div>
                            <div className='flex-td'>Yes</div>
                        </div>

                    </div>

                </div>
            </div>
        </>

    )
}

export default ViewEvents;