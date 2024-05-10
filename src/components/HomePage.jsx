import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import '../App.css';
function HomePage(){
    return(
        <>
        <Container fluid className="backgroundImage-container vh-50 min-vh-100">
        <Row className="justify-content-space-between vh-100">
            <Col className='vh-50 vw-100'><img src="https://www.eternity-uk.com/wp-content/uploads/2023/07/f5729de965dbd52bc8694bc74f12386b.jpeg"  className='img-fluid vh-100 vw-100 m-1' alt="homeImage"/></Col>
            <Col className="vh-100 vw-100 justify-content-center ">
                <h1 className='homepage-text m-5'><i>Sit back while we create the experience of a lifetime!!!!!</i></h1>
                <Card className=" homepage-card  hover-overlay shadow-2">
                    <Card.Text >We intend to help you organize successful wedding event.The system assists the couples in the decision making and planning processes associated with all aspects of a wedding </Card.Text>
                    </Card>
            </Col>
        </Row>
        </Container>
        </>
    )
}
export default HomePage