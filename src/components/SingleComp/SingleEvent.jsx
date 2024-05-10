/* eslint-disable no-unused-vars */
import { useContext, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { useLocation,useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Context from '../../ContextApi/ContextProvider';
import axios from 'axios';
import AuthContext from '../../ContextApi/AuthProvider';
function SingleEvent(props){
    const {URL}=useContext(Context)
    const {token,currentUser}=useContext(AuthContext)
    const navigate = useNavigate()
    const [eventDate,setEventDate]=useState(Date)
      const state  = useLocation();
      const element = state.state
      
      const handleOnSubmit=async()=>{
        try{
        await axios.post(`${URL}plan/addEvent`,{
            token :token,
            userId: localStorage.getItem('user'),
            _id:element._id,
            Date: `${eventDate}`
        })
        navigate("/MyWeddingPlan")
    }
        catch(error){
            alert('Login To Add Event to your Wedding plan')
            navigate("/login")
        }
       
    }
    return(
        <>
        <div className='container-fluid d-flex flex-wrap'>
            <div className='row'>
                <div className='col-6'>
         <Card className="single-container m-5 vh-50"  key={element._id}>
            <Card.Img className="image-container vw-50 " variant="top" src={element.imageUrl} />
            <Card.Body>
                <Card.Title>{element.eventName}</Card.Title>
                <Card.Text >
                    <p>{element.description}</p>
                </Card.Text></Card.Body>
        </Card>
        </div>
        <div className='col-6'>
            <form  className='center'>
                <label htmlFor='dateEvent'><b>Select Date Of Event</b></label>
                <input className="form-control input-lg" id="dateEvent" type='date' onChange={(e)=>setEventDate(e.target.value)}></input>
                <Button onClick={handleOnSubmit} className="form-control input-lg"  variant='danger'>Add Event To My Plan</Button>
            </form>
        </div>
        </div>
        </div>
        </>
    )

}

export default SingleEvent;
