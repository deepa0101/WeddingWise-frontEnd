/* eslint-disable react/prop-types */
import { useState, useEffect,createContext } from 'react';
const AuthContext = createContext()

export const AuthProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState();
    const [userLoggedIn, setUserLoggedIn] = useState();
    const[token, setToken]=useState("")
    useEffect(() => {
        setCurrentUser(localStorage.getItem('user')),
        setToken(localStorage.getItem('token')),
        setUserLoggedIn(localStorage.getItem('userLoggedIn'))
    },[currentUser,userLoggedIn])
    return (
        <AuthContext.Provider value={{currentUser, setCurrentUser, userLoggedIn,setUserLoggedIn,token,setToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;