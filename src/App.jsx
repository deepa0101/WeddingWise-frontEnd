import './App.css'
import Event from './components/Events'
import FooterBar from './components/Footer'
import Homepage from './components/HomePage';
import NavbarHeader from './components/NavbarHeader'
import SearchBar from './components/SearchBar'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Venue from './components/Venue';
import Vendors from './components/Vendor';
import SingleEvent from './components/SingleComp/SingleEvent';
import SingleVenue from './components/SingleComp/SingleVenue';
import SingleVendor from './components/SingleComp/SingleVendor';
import Login from './components/Authentication/Login';
import Signup from './components/Authentication/Signup';
import Logout from './components/Authentication/Logout';
import MyWeddingPlan from './components/MyWeddingPlan';
import Todo from './components/Todo';
import BudgetTrack from './components/BudgetTrack';
function App() {


  return (
    <>
    <NavbarHeader/>
    <SearchBar/>
    <FooterBar/>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/logout" element={<Logout/>}/>
     <Route path="/signup" element={<Signup/>}/>
      <Route path="/events" element={<Event/>}/>
      <Route exact path="/singleEvent" element={<SingleEvent/>}/>
      <Route exact path="/singleVenue" element={<SingleVenue/>}/>
      <Route exact path="/singleVendor" element={<SingleVendor/>}/>
      <Route path="/venues" element={<Venue/>}/>
      <Route path="/vendors" element={<Vendors/>}/>
      <Route path="/MyWeddingPlan" element={<MyWeddingPlan/>} />
      <Route path="/todo" element={<Todo/>} />
      <Route path="/budgetTracker" element={<BudgetTrack/>} />

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
