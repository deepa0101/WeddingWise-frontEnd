/* eslint-disable no-unused-vars */
import { useState,useEffect, useContext } from "react";
import axios from "axios";
import AuthContext from "../ContextApi/AuthProvider";
import Context from "../ContextApi/ContextProvider";
import Card from 'react-bootstrap/Card';
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const MyWeddingPlan =()=>{
    const {weddingPlans,URL}= useContext(Context);
    const navigate = useNavigate()
    async function removeEvent(id)
    {
        await axios.post(`${URL}plan/removeEvent`,
        {
            userId: localStorage.user,
            _id: id,
        });
    }
    
    
return(
    <>
    <div className='plan-container d-flex flex-wrap gap-2 mt-5  justify-content-evenly'>
    <h1 className="font" style={{textAlign:"center"}}>MY PLANS</h1>
    {
        (weddingPlans.length==0)?(<h1 className="font" style={{textAlign:"center"}}> Add events to of Your choice in your Wedding plan</h1>)
        :
        weddingPlans.map(element => {
        const {event,venue,vendor}=element; 
        
            
    return ( 
    <Card className="font card-container w-75 mx-5"  key={element._id}>
        <Card.Body>
            <Card.Title><b>{event.eventName}</b></Card.Title>
            <Card.Text ><b>EventDate:</b> {element.eventDate}</Card.Text>
            { (venue!=undefined)?
            (<Card.Text ><b>Venue:</b>{venue.venueName}-(Rs.{venue.price})</Card.Text>):
            <Card.Text>Venue: Not Added</Card.Text>}
             { (vendor!=undefined)?
            <Card.Text><b> Vendor:</b>
            {vendor.map(element=>
                <ol key={element._id}> {element.vendorName}({element.service_category}) - (Rs.{element.price})</ol>
            )}</Card.Text>: <Card.Text>Vendor: Not Added</Card.Text>}
            </Card.Body>
            <Button onClick={()=>removeEvent(element._id)} variant="light">Remove from Plan</Button>
    </Card>); })}
    </div>
    </>
)
}

export default MyWeddingPlan;