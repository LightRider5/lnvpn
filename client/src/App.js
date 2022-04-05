import {Row, Col, Container, Alert} from 'react-bootstrap'
import socketIOClient from "socket.io-client";
import Button from './components/Button'
import {useState} from 'react'
import KeyInput from './components/KeyInput'
import CountrySelector from './components/CountrySelector';
import  './wireguard.js'
import HeaderInfo from './components/HeaderInfo';
const ENDPOINT = "http://127.0.0.1:5001";
const socket = socketIOClient(ENDPOINT);
var keyPair ;



function App() {
  const [keyPair, displayNewPair] = useState(window.wireguard.generateKeypair())
  return (
    <div>
      <Container className="main-middle">
        <Row>
          <Col>
          <h1>LN VPN</h1>
          <HeaderInfo/>
          <KeyInput publicKey={keyPair.publicKey} privateKey={keyPair.privateKey}/>
          <CountrySelector/>
            <div className='buttons'>
              <Button onClick={() => displayNewPair (window.wireguard.generateKeypair)} text="Generate New Key"/>
              <Button onClick={getInvoice} text="Get Invoice"/>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    
  );
  
}
const getInvoice = () => {
  console.log("Click")
  socket.emit("getInvoice", amount => {
  console.log("Click")
  });
}

const generateRandomKey = () => {
  console.log("Click")
  keyPair = window.wireguard.generateKeypair()
  console.log(keyPair)
}



export default App;
