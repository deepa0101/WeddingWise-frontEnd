import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import AuthContext from '../ContextApi/AuthProvider';
import { useContext } from 'react';
function NavbarHeader() {
  const {userLoggedIn} = useContext(AuthContext)
  return (
    <Navbar className='nav-container' fixed="top" collapseOnSelect expand="lg" data-bs-theme="dark"  style={{backgroundColor:"#D1C1F2"}}>
      <Container>
        <Navbar.Brand href="/">WeddingWise</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/events">Events</Nav.Link>
            <Nav.Link href="/venues">Venues</Nav.Link>
            <NavDropdown title="Vendors & Services" href='/vendors' id="collapsible-nav-dropdown">
              <NavDropdown.Item href='/vendors' >All Vendors</NavDropdown.Item>
              <NavDropdown.Item href="/catering"disabled>Catering</NavDropdown.Item>
              <NavDropdown.Item href="decoration" disabled>Decorations</NavDropdown.Item>
              <NavDropdown.Item href="/photography" disabled>Photography</NavDropdown.Item>
              <NavDropdown.Item href="/videography" disabled>Videography</NavDropdown.Item>
              <NavDropdown.Item href="/weedingInvites" disabled>Wedding Invites</NavDropdown.Item>
              <NavDropdown.Item href="/bridalMakeup" disabled>Bridal MakeUp</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {!userLoggedIn?(
          <Nav.Link href='/login'> Login </Nav.Link>):
            (<>
            <NavDropdown title="Tools" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="/MyWeddingPlan">MyWeddingPlan</NavDropdown.Item>
              <NavDropdown.Item href="/budgetTracker">Budget Tracker</NavDropdown.Item>
              <NavDropdown.Item href="/todo">TodoList</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='/logout'>LogOut</Nav.Link>
          </>)}
          </Nav>
          </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarHeader;