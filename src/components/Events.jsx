
import Context from "../ContextApi/ContextProvider";
import { useContext,useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MDBCheckbox } from 'mdb-react-ui-kit';
import Card from 'react-bootstrap/Card';
function Events(){
    const navigate = useNavigate();
    const [checked,setChecked] = useState([]);
    const {event}=useContext(Context);
    const [data,setData] = useState([]);
    const categories = [...new Set(event.map(item =>item.eventType))];
    const handleCheck = (event) => {
       const currentIndex = checked.indexOf(event);
       const newChecked =[...checked];
       if(currentIndex === -1){
        newChecked.push(event)
       } else{
        newChecked.splice(currentIndex,1)
       }setChecked(newChecked)
    }

       useEffect(()=>{
        if(checked.length == 0){
        setData(event) }
        else  
        setData(event.filter(item=> checked.includes(item.eventType)))},[checked,event])

    const singleComp=(element)=>{
        navigate("/singleEvent",{state:element});
    };
    return(
        <>
        <div className="container-fluid overflow-x-hidden">
            <div className="row mt-5 ">
                <div className="mt-3 col-md-2">
                    <h1>Categories</h1>
                    {categories.map((e,index) => {return(
                <MDBCheckbox key={index} name='flexCheck' onChange={()=>handleCheck(e)} value={e} id={e} label={e} />)})}
                </div>
                <div className="col-md-10">
        <div className='home-container d-flex flex-wrap gap-2 m-1 justify-content-evenly'>
        {data.map(element => {
        return ( 
        <Card onClick={()=>singleComp(element)} className="card-container w-25"  key={element._id}>
            <Card.Img className="image-container" variant="top" src={element.imageUrl} />
            <Card.Body>
                <Card.Title>{element.eventName}</Card.Title>
                <Card.Text >
                    <p>{element.description}</p>
                </Card.Text></Card.Body>
        </Card>
        ); })}
        </div>
        </div>
        </div></div>
        </>
    )
}
export default Events;