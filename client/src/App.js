import {Row, Col, Container} from 'react-bootstrap'
import {io} from "socket.io-client";
import Button from './components/Button'
import {useState} from 'react'
import KeyInput from './components/KeyInput'
import Price from './components/Price';
import CountrySelector from './components/CountrySelector';
import RuntimeSelector from './components/RuntimeSelector';
import InvoiceModal from './components/InvoiceModal';
import  './wireguard.js'
import HeaderInfo from './components/HeaderInfo';
var socket =  io.connect('http://localhost:5001')

var emailAddress;
var clientPaymentHash;



function App() {
  const [keyPair, displayNewPair] = useState(window.wireguard.generateKeypair())
  const [priceDollar, updatePrice] =  useState(0.1)
  const [country, updateCountry] =  useState(1)
  const [showSpinner, setSpinner] = useState(true)
  const [payment_request, setPaymentrequest] = useState(0) 
   ///////Modal Invoice
   const [visibleInvoiceModal, setShowInvoiceModal] = useState(false);
   const closeInvoiceModal = () => setShowInvoiceModal(false);
   const showInvoiceModal = () => setShowInvoiceModal(true);
  ///////Modal Configdata
   const [isConfigModal, showConfigModal] = useState(false) 
   const renderConfigModal = () => showConfigModal(true);
   const hideConfigModal = () => showConfigModal(false);
  ///////Email Address form EmailModal
  

  //////Updates the QR-Code
  const updatePaymentrequest = () => {
    socket.on('lnbitsInvoice',invoiceData => {
      setPaymentrequest(invoiceData.payment_request)
      clientPaymentHash = invoiceData.payment_hash;
      setSpinner(false)
    })
  }

  ////Connect to WebSocket Server
  socket.on("connect", () => {
    //console.log(socket.id); 
  });

  //Get the invoice and send also the keypair
  const getInvoice = (price) => {
    socket.emit("getInvoice", price)
  }
  ///////////GetWireguardConfig 
  const getWireguardConfig = (publicKey,presharedKey,priceDollar,country) =>{
    socket.emit('getWireguardConfig',publicKey,presharedKey,priceDollar,country)
  }

  socket.off('invoicePaid').on('invoicePaid', paymentHash => {  
    if(paymentHash === clientPaymentHash)
    {
      setSpinner(true)
      getWireguardConfig(keyPair.publicKey,keyPair.presharedKey,priceDollar,country)
    }
  })

  /////////Get wireguard config from Server
  socket.off('reciveConfigData').on('reciveConfigData',wireguardConfig =>{
    setSpinner(false)
    setPaymentrequest(buildConfigFile(wireguardConfig).join('\n'))
    
  })
  /////////Construct the Config File
  const buildConfigFile = (serverResponse) => {
    showInvoiceModal ()
    renderConfigModal()
    const configArray = [
    '[Interface]',
    'PrivateKey = ' + keyPair.privateKey,
    'Address = '+serverResponse.ipv4Address,
    'DNS = '+serverResponse.dns,
    ' ',
    '[Peer]',
    'PublicKey = '+serverResponse.publicKey,
    'PresharedKey = '+keyPair.presharedKey,
    'Endpoint = '+serverResponse.ipAddress+':'+serverResponse.listenPort,
    'AllowedIPs = '+serverResponse.allowedIPs];
    return configArray
  }

  ///////////Change Runtime
  const runtimeSelect = (e) =>{
    updatePrice(e.target.value)
    
  }

  const countrySelect = (e) => {
    updateCountry(e.target.value)

  }


  const download = (filename,text) => {
    const textArray = [text]
    const element = document.createElement("a");
    const file = new Blob(textArray, {
      type: "text/plain",endings:'native'
    });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
  };

  const sendEmail = (email,config) => {
    socket.emit('sendEmail',email,config)
  }
  
 

  return (
    <div>
      <Container className="main-middle">
        <Row>
          <Col>
          <h1>LN ⚡ VPN</h1>
         
          <HeaderInfo/>
          <KeyInput publicKey={keyPair.publicKey} privateKey={keyPair.privateKey} presharedKey={keyPair.presharedKey}/>
          <CountrySelector onClick={countrySelect}/>
          <RuntimeSelector onClick={runtimeSelect} />

          <InvoiceModal  
          show={visibleInvoiceModal} 
          showSpinner={showSpinner} 
          isConfigModal={isConfigModal} 
          value={payment_request} 
          download={() => {download("Wireguard.conf",payment_request)}}
          showNewInvoice={() => {getInvoice(priceDollar);setSpinner(true)}} 
          handleClose={closeInvoiceModal}
          emailAddress = {emailAddress}
          sendEmail = {(data) => sendEmail(data,payment_request)}
          />
          
          <Price dollar={priceDollar}/>
            <div className='buttons'>
              <Button onClick={() => displayNewPair(window.wireguard.generateKeypair)} text="Generate New Key"/>
              <Button onClick={() => {getInvoice(priceDollar);showInvoiceModal();hideConfigModal();updatePaymentrequest();setSpinner(true)}} text="Get Invoice"/>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    
  );
  
}


export default App;


