import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBInputGroup>
      <MDBInput label='Search for Vendors&Services' />
      <MDBBtn  color='#D1C1F2'>
        <MDBIcon icon='search' />
      </MDBBtn>
    </MDBInputGroup>
  );
}