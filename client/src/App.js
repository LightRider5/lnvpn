import {Row, Col, Container, Navbar,Nav} from 'react-bootstrap'
import {io} from "socket.io-client";
import {Button} from 'react-bootstrap'
import {useState} from 'react'
import KeyInput from './components/KeyInput'
import Price from './components/Price';
import CountrySelector from './components/CountrySelector';
import RuntimeSelector from './components/RuntimeSelector';
import InvoiceModal from './components/InvoiceModal';
import  './wireguard.js'
import {getTimeStamp} from './timefunction.js'
import HeaderInfo from './components/HeaderInfo';
import FAQModal from './components/FAQModal';
import logo from './media/logo2.svg';
import AlertModal from './components/AlertModal';
var socket =  io.connect(process.env.REACT_APP_socket_port)


var emailAddress;
var clientPaymentHash;
var isPaid=false; //Is only necessary in the case of socket event is fireing multible times


function App() {
  const [keyPair, displayNewPair] = useState(window.wireguard.generateKeypair())
  const [priceDollar, updatePrice] =  useState(process.env.REACT_APP_price_hour)
  const [country, updateCountry] =  useState("0")
  const [showSpinner, setSpinner] = useState(true)
  const [payment_request, setPaymentrequest] = useState(0) 
  const [showPaymentSuccessfull, setPaymentAlert] = useState(false);
   ///////Modal Invoice
   const [visibleInvoiceModal, setShowInvoiceModal] = useState(false);
   const closeInvoiceModal = () => setShowInvoiceModal(false);
   const showInvoiceModal = () => setShowInvoiceModal(true);
  ///////Modal Configdata
   const [isConfigModal, showConfigModal] = useState(false) 
   const renderConfigModal = () => showConfigModal(true);
   const hideConfigModal = () => showConfigModal(false);
   //////Alert - Modal
   const [alertModalparams,showAlertModal] = useState({show:false,text:"",type:""});
   
   const hideAlertModal = () => showAlertModal({show:false,text:"",type:""});
  
  ///////Successfull payment alert
   const renderAlert = (show) => {
    setPaymentAlert(show)
  } 

  //////Updates the QR-Code
  const updatePaymentrequest = () => {
    socket.on('lnbitsInvoice',invoiceData => {
      setPaymentrequest(invoiceData.payment_request)
      clientPaymentHash = invoiceData.payment_hash;
      setSpinner(false)
    }) 
  }

  ////Connect to WebSocket Server
  socket.off('connect').on("connect", () => {
    /////Checks for already paid invoice if browser switche tab on mobile
    if((clientPaymentHash !== undefined)){
      checkInvoice()
    }
  });

  const checkInvoice = () =>{ 
      socket.emit('checkInvoice',clientPaymentHash)
  }

  //Get the invoice 
  const getInvoice = (price) => {
    if(country === "0"){
      showAlertModal({show:true,text:"Please select a country",type:"danger"})
    }
    else
    {
      socket.emit('getInvoice', price)
      showInvoiceModal();
    }
  }
  ///////////GetWireguardConfig 
  const getWireguardConfig = (publicKey,presharedKey,priceDollar,country) =>{
    socket.emit('getWireguardConfig',publicKey,presharedKey,priceDollar,country)
  }

  socket.off('invoicePaid').on('invoicePaid', paymentHash => { 
    if((paymentHash === clientPaymentHash) && !isPaid)
    { 
      renderAlert(true)
      isPaid = true;
      setSpinner(true)
      getWireguardConfig(keyPair.publicKey,keyPair.presharedKey,priceDollar,country)
    }
  })

  /////////Get wireguard config from Server
  socket.off('reciveConfigData').on('reciveConfigData', (wireguardConfig, timestamp,location) =>{
    setSpinner(false)
    setPaymentrequest(buildConfigFile(wireguardConfig,timestamp,location).join('\n'))
    
  })
  /////////Construct the Config File
  const buildConfigFile = (serverResponse,timestamp,location) => {
    showInvoiceModal ()
    renderConfigModal()
    const configArray = [
    '[Interface]',
    'PrivateKey = ' + keyPair.privateKey,
    'Address = '+serverResponse.ipv4Address,
    'DNS = '+serverResponse.dns,
    ' ',
    '# Valid until: '+ timestamp +'UTC',
    '# Location: '+ location,
    ' ',
    '[Peer]',
    'PublicKey = '+serverResponse.publicKey,
    'PresharedKey = '+keyPair.presharedKey,
    'Endpoint = '+serverResponse.ipAddress+':'+serverResponse.listenPort,
    'AllowedIPs = '+serverResponse.allowedIPs];
    return configArray
  }

 
  //Change Runtime
  const runtimeSelect = (e) =>{
    if(!isNaN(e.target.value)) {
      updatePrice(e.target.value);
    }
  };

  const countrySelect = (e) => {
    if(!isNaN(e.target.value)) {
    updateCountry(e.target.value)
    }
  }


  const download = (filename,text) => {
    const textArray = [text]
    const element = document.createElement("a");
    const file = new Blob(textArray, {
      // type: 'text/plain',
      endings:'native'
    });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
  };

  const sendEmail = (email,config,date) => {
    socket.emit('sendEmail',email,config,date)
  }
  
 

  return (
    <div>
          <Navbar variant="dark" className="justify-content-end container">
            <Nav variant="pills" activeKey="/">
                <Nav.Item>
                    <Nav.Link href="/">🏠 Home </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/guide">🦮 Guide </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/faq.html">📖 FAQ </Nav.Link>
                </Nav.Item>
            </Nav>
          </Navbar>      
          <Row>
            <div id='logo'>
              <img src={logo} alt="LN ⚡ VPN" id="header-image"></img> 
            </div>
          </Row>     
      <Container className="main-middle">
        <Row>
          <Col>
            <HeaderInfo/>
          <div id="key-input">
            <KeyInput 
            onClick={() => displayNewPair(window.wireguard.generateKeypair)}
            publicKey={keyPair.publicKey} 
            privateKey={keyPair.privateKey} 
            presharedKey={keyPair.presharedKey}
            newPrivateKey={(privateKey) => {keyPair.privateKey = privateKey}} 
            newPublicKey={(publicKey) => {keyPair.publicKey = publicKey}} 
            newPresharedKey={(presharedKey) => {keyPair.presharedKey = presharedKey}} 
            />
          </div>
          <CountrySelector onChange={countrySelect}/>
          <RuntimeSelector onChange={runtimeSelect} />
          
          <AlertModal 
          show={alertModalparams.show}
          text={alertModalparams.text}
          variant={alertModalparams.type}
          handleClose={hideAlertModal}
          />
          
          <InvoiceModal  
          show={visibleInvoiceModal} 
          showSpinner={showSpinner} 
          isConfigModal={isConfigModal} 
          value={payment_request} 
          download={() => {download("Wireguard.conf",payment_request)}}
          showNewInvoice={() => {getInvoice(priceDollar);setSpinner(true)}} 
          handleClose={closeInvoiceModal}
          emailAddress = {emailAddress}
          expiryDate = {getTimeStamp(priceDollar)}
          sendEmail = {(data) => sendEmail(data,payment_request,getTimeStamp(priceDollar))}
          showPaymentAlert = {showPaymentSuccessfull}
          />       
          <Price dollar={priceDollar}/>
            <div className='main-buttons'>
            
              <Button 
              onClick={() => {getInvoice(priceDollar);
                renderAlert(false);
                // showInvoiceModal();
                hideConfigModal();
                updatePaymentrequest();
                setSpinner(true);
                isPaid=false;
              }} 
              variant="success">Pay with Lightning
              </Button>
            
            {/* <Row>
              <Col>
              <Button 
                id="faq_button"
                variant="info">Show FAQ
              </Button>
              </Col>
            </Row>   */}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    
  );
  
}


export default App;


