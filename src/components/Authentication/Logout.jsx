/* eslint-disable no-unused-vars */
import { Button } from "react-bootstrap";
import { useContext } from "react";
import { useNavigate } from 'react-router-dom';
import  axios  from 'axios';
import AuthContext from '../../ContextApi/AuthProvider';
import Context from "../../ContextApi/ContextProvider";

function Logout(){
    const navigate =useNavigate();
    const {setCurrentUser,setUserLoggedIn,userLoggedIn,setToken} =useContext(AuthContext);
    const {URL} = useContext(Context)
    const handleLogOut = async() => {
      try {
        const res = await axios.post(
          `${URL}user/logout`,
          );
          if(res){
            localStorage.clear(),
            navigate("/login")
            window.location.reload()
          }
      }
       catch (error) {
        console.log(error)
        alert(error);
      }
    };
      
    return(
        <>
        <Button style={{position:"absolute",top:"50%",right:"50%",textAlign:"center"}} onClick={handleLogOut}>Logout</Button>
        </>
    )
}

export default Logout;