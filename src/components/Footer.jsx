import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function FooterBar() {
  return (
    <Navbar expand="lg" fixed="bottom" style={{backgroundColor:"#D1C1F2"}} >
      <Container>
        <Navbar.Text className="m-auto">WeddingWise Copyrights@ Deepalakshmi</Navbar.Text>
      </Container>
    </Navbar>
  );
}

export default FooterBar;