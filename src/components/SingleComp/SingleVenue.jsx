/* eslint-disable no-unused-vars */
import { useContext,useState } from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import { useLocation,useNavigate } from 'react-router-dom';
import Context from '../../ContextApi/ContextProvider';
import axios from 'axios';
function SingleEvent(props){
    const navigate = useNavigate();
    const { URL,weddingPlans } =useContext(Context);
    const [selectedEvent, setSelectedEvent] = useState('Select an event');
    const handleSelectChange = (e) => {
        setSelectedEvent(e.target.value);
    }
      const state  = useLocation();
      const element = state.state;
      const events = weddingPlans.map(element =>element.event);
      const handleOnSubmit=async()=>{
        await axios.post(`${URL}plan/addVenue`,{
            userId: localStorage.user,
            _id:element._id,
            eventid : selectedEvent
        }
    )
        navigate("/MyWeddingPlan");
    }
    return(
        <>
        <div className='container-fluid font d-flex flex-wrap'>
            <div className='row'>
                <div className='col-8'>
         <Card className="single-container  p-5"  key={element._id}>
            <Card.Img className="image-container vw-50" variant="top" src={element.imageUrl} />
            <Card.Body>
                <Card.Title><b>VenueName: </b>{element.venueName}</Card.Title>
                <Card.Text ><b>Address: </b>{element.address}</Card.Text>
                <Card.Text ><b>Price: </b>Rs.{element.price} onwards</Card.Text>
                <Card.Text ><b>Contact Number: </b>{element.phone}</Card.Text>
                <Card.Text ><b>Website: </b>{element.url}</Card.Text>
                </Card.Body>
        </Card>
        </div>
        <div className='col-2'>
            <div>
            <form className='center'>
                <label htmlFor='dateEvent'><b>Select Event</b></label>
                <select id='dateEvent' value={selectedEvent} onChange={handleSelectChange}>
                    <option>Select an Event</option>
                    {(events.length==0)? <option>Add Event in plan to Add Venue</option>
                    :
                    events.map(element => (
                        <option key={element.eventName} value={element._id}>{element.eventName}</option>))}
                </select>
                <Button onClick={handleOnSubmit} className="form-control input-lg" variant='danger'>Add Venue To My Plan</Button>
            </form></div>
        </div>
        </div></div>
        </>
    )

}

export default SingleEvent;
