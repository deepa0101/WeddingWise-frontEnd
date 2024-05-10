/* eslint-disable no-unused-vars */
import Card from 'react-bootstrap/Card';
import { useLocation,useNavigate } from 'react-router-dom';
import { useContext,useState } from 'react';
import Context from '../../ContextApi/ContextProvider';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
function SingleVendor(props){
    const navigate = useNavigate();
      const state  = useLocation();
      const element = state.state;
      const { URL,weddingPlans } =useContext(Context);
    const [selectedEvent, setSelectedEvent] = useState('Select an event');
    const handleSelectChange = (e) => {
        setSelectedEvent(e.target.value);
    }
    const events = weddingPlans.map(element =>element.event)
    const handleOnSubmit=async()=>{
        await axios.post(`${URL}plan/addVendor`,{
            userId: localStorage.user,
            _id:element._id,
            eventid : selectedEvent
        }
    ); navigate('/MyWeddingPlan')
    }
    
    
    return(
        <>
        <div className='container-fluid d-flex flex-wrap'>
            <div className='row'>
                <div className='col-10'>
         <Card className="single-container font p-5"  key={element._id}>
            <Card.Img className="image-container vh-50" variant="top" src={element.imageUrl} />
            <Card.Body>
                <Card.Title><h1>{element.vendorName}</h1></Card.Title>
                <Card.Text ><b>Service:</b> {element.service_category}</Card.Text>
                <Card.Text ><b>Address:</b> {element.address}</Card.Text>
                <Card.Text ><b>Phone:</b> {element.phone}</Card.Text>
                <Card.Text ><b>OfficialWebsite:</b> {element.url}</Card.Text>
                </Card.Body>
        </Card>
        </div>
        <div className='col-2'>
            <div>
            <form className='font center'>
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

export default SingleVendor;
