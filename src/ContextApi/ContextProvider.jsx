/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { createContext,useEffect,useState } from "react";
import axios from 'axios';

const URL = "https://weddingwise-backend-1.onrender.com/"
const Context = createContext();

export const ContextProvider= ({ children }) =>{
    const [event, setEvent] = useState([]);
    const [venue, setVenue] = useState([]);
    const [vendor, setVendor] = useState([]);
    const [weddingPlans,setWeddingPlan] = useState([]);

    useEffect(()=>{
      async function response() {
          let response = await axios.get(`${URL}plan/getPlan/${localStorage.user}`)
          setWeddingPlan(response.data)
      }
      response()
    },[weddingPlans])

   useEffect(()=>{  axios.get(`${URL}event/getEvents`).then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });},[])
      useEffect(()=>{  axios.get(`${URL}venue/getVenues`).then((response) => {
        setVenue(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });},[])
      useEffect(()=>{  axios.get(`${URL}vendor/getVendors`).then((response) => {
        setVendor(response.data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });},[])

      return(
        <Context.Provider  value={{URL,event,venue,vendor,weddingPlans}}>
           {children}
        </Context.Provider>
    )
}

export default Context;
