
import Context from "../ContextApi/ContextProvider";
import { useContext,useState,useEffect } from "react";
import Card from 'react-bootstrap/Card';
import { MDBCheckbox } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
function Venue(){
    const {venue}=useContext(Context)
    const navigate = useNavigate()
    const [checked,setChecked] = useState([])
    const [data,setData] = useState([])
    const categories = [...new Set(venue.map(item =>item.category_name))]
    const handleCheck = (event) => {
        const currentIndex = checked.indexOf(event);
        const newChecked =[...checked]
        if(currentIndex === -1){
         newChecked.push(event)
        } else{
         newChecked.splice(currentIndex,1)
        }setChecked(newChecked)
     }
     useEffect(()=>{
        if(checked.length == 0){
        setData(venue) }
        else  
        setData(venue.filter(item=> checked.includes(item.category_name)))},[checked,venue]);

        const singleComp=(element)=>{
            navigate("/singleVenue",{state:element});
        };

    return(
        <>
        <div className="container-fluid font overflow-x-hidden">
            <div className="row mt-5 ">
                <div className="mt-3 col-md-2">
                    <h1>Categories</h1>
                    {categories.map((e,index) => {return(
                <MDBCheckbox key={index} name='flexCheck' onChange={()=>handleCheck(e)} value={e} id={e} label={e} />)})}
                </div>
                <div className="col-md-10">
        <div className='home-container d-flex flex-wrap gap-2 m-2 justify-content-evenly'>
        {data.map(element => {
        return ( 
        <Card onClick={()=>singleComp(element)} className="card-container w-25" key={element._id} >
            <Card.Img className="image-container" variant="top" src={element.imageUrl} />
            <Card.Body>
                <Card.Title>{element.venueName}</Card.Title>
                <Card.Text>
                    <h5>Rs.{element.price} onwards</h5></Card.Text>
                    <Card.Text><p>Rating: {element.rating}</p>
                </Card.Text>
            </Card.Body>
        </Card> ); })}
        </div></div></div>
        </div>
        </>
        
    )
}
export default Venue;