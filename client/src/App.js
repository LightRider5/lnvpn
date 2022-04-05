import {Row, Col, Container} from 'react-bootstrap'
import socketIOClient from "socket.io-client";
import Button from './components/Button'
import  './wireguard.js'
const ENDPOINT = "http://127.0.0.1:5001";
const socket = socketIOClient(ENDPOINT);

function App() {
  return (
   
    <div>
      <Container className="main-middle">
        <Row>
          <Col>
          <h1>LN VPN</h1>
            <div className='buttons'>
              <Button onClick={generateRandomKey} text="Generate New Key"/>
              <Button onClick={getInvoice} text="Get Invoice"/>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    
  );
  function click(){
    console.log("Huhu")
  }
}
const getInvoice = () => {
  console.log("Click")
  socket.emit("getInvoice", amount => {
  console.log("Click")
  });
}
const generateRandomKey = () => {
  console.log(window.wireguard.generateKeypair());

}


export default App;
