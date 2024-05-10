
import Context from "../ContextApi/ContextProvider";
import { useContext,useState,useEffect} from "react";
import Card from 'react-bootstrap/Card';
import { MDBCheckbox } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";
function Vendors(){
    const {vendor}=useContext(Context);
    const [checked,setChecked] = useState([]);
    const [data,setData] = useState([]);
    const navigate = useNavigate();
    console.log(vendor)
    const categories = [...new Set(vendor.map(item =>item.service_category))];
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
        setData(vendor) }
        else  
        setData(vendor.filter(item=> checked.includes(item.service_category)))},[checked,vendor])
        const singleComp=(element)=>{
            navigate("/singleVendor",{state:element});
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
        <div className='home-container d-flex flex-wrap gap-2 m-2 col-xs-12 justify-content-evenly'>
        {data.map(element => {
        return ( 
        <Card onClick={()=>singleComp(element)} className="card-container w-25" key={element._id} >
            <Card.Img className="image-container" variant="top" src={element.imageUrl} />
            <Card.Body>
                <Card.Title><b>{element.vendorName}</b></Card.Title>
                <Card.Text>
                    <h5><b>PRICE:</b> Rs.{element.price} Onwards</h5></Card.Text>
                    <Card.Text>
                <p>Rating: {element.rating}</p>
                </Card.Text>
            </Card.Body>
        </Card> ); })}
        </div></div></div></div>
        </>
    )
}
export default Vendors;