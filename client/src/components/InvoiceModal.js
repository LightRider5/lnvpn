import React from 'react'
import { useState,useRef} from 'react';
import {QRCodeCanvas} from 'qrcode.react'
import {Modal,Button,Spinner,Overlay,Tooltip,Collapse,Alert}from 'react-bootstrap'
import EmailModal from './EmailModal';

function InvoiceModal(props) {
  const [visibleEmailModal, setShowEmailModal] = useState(false);
  const closeEmailModal = () => setShowEmailModal(false);
  const showEmailModal = () => setShowEmailModal(true);


  const [showTooltip, setShowTooltip] = useState(false);
  const [openCollapse, setOpen] = useState(false);
  const target = useRef(null);


  const renderTooltip = (show) => {
    setShowTooltip(show)
    setTimeout(() => setShowTooltip(false), [1000])
  }

  
   
  if(!props.show){
     return (null)
   } 

  if(props.value === (undefined || null)){
    return (
      <div>
        <Modal show={props.show} onHide={props.handleClose} centered>
        <Modal.Header closeButton> 
          <Modal.Title>Something went wrong</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Could not receive a valid invoice. Try again later!
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>

        </Modal.Footer>

        </Modal>

      </div>

    )
  } 
   
  return (
    <div>
        <Modal show={props.show} 
        onHide={props.handleClose} 
        backdrop="static"
        keyboard={false}
        id="main_modal" 
        centered
        >
        <Modal.Header closeButton> 
        {props.isConfigModal ? 
        <Modal.Title>Scan, send or download config</Modal.Title>:
        <Modal.Title>Scan or copy invoice</Modal.Title> 
          }
        </Modal.Header>

        <Modal.Body>
            <Alert show={props.showPaymentAlert}   variant="success">
              Payment successfull!
            </Alert> 
          {props.showSpinner ? 
            <Spinner animation="border" /> :
            <div>
              {props.isConfigModal ?
                <QRCodeCanvas value={props.value} size={256} /> :
                <a href={"lightning:" + props.value}>
                  <QRCodeCanvas value={props.value} size={256} />
                </a>
              }
            </div> 
          }
        
        
        {props.isConfigModal ?
         <div>
           
           <p>
           WireGuard VPN config, scan via the <a href="https://www.wireguard.com/install/" target="_blank" rel="noreferrer">WireGuard App on 
          your smartphone</a>, download the config file for <a href="https://www.wireguard.com/install/" target="_blank" rel="noreferrer">WireGuard 
          for Windows and MacOS</a> or send it to yourself via Email to use it later on another device.
          </p>
         
          <p id='expirydate'>
            Valid until: {props.expiryDate.toString()}<br></br>
            Make sure to save your config before closing. Otherwise it is lost. 
          </p>
        
          </div>
          :
        <p>
        This QR-Code is a Lightning invoice. Pay with a Wallet like <a href="https://phoenix.acinq.co/" target="_blank" rel="noreferrer">Phoenix</a>, <a href="https://muun.com/" target="_blank" rel="noreferrer">Muun</a>, <a href="https://breez.technology/" target="_blank" rel="noreferrer">Breez</a> or <a href="https://bluewallet.io/" target="_blank" rel="noreferrer">BlueWallet</a>.  
        </p>
          }
        <Collapse in={openCollapse}>
          <div id="example-collapse-text">
          {props.showSpinner ? null : <div id="invoicestring" className="container">{props.value}</div>}
          </div>
        </Collapse>
        </Modal.Body>
        <Modal.Footer>
          {props.isConfigModal ? 
          <Button variant='success' onClick={()=> {showEmailModal(true)}}>Send via Email</Button>
          :
          <Button variant="secondary" onClick={props.showNewInvoice}>
            Get new Invoice
          </Button>}

          {/*Render Show Config or Show PR button  */}
          {props.isConfigModal ? 
          <Button 
            variant="success"
            onClick={() => setOpen(!openCollapse)}
            aria-controls="example-collapse-text"
            aria-expanded={!openCollapse}
          >{!openCollapse ? 'Show Config' : 'Hide Config'}
          </Button> :
          <Button
            variant="success"
            onClick={() => setOpen(!openCollapse)}
            aria-controls="example-collapse-text"
            aria-expanded={!openCollapse}
          >{!openCollapse ? 'Show Invoice' : 'Hide Invoice'}
          </Button>}

          {/*Render Copy Invoice or Download button  */}
          {props.isConfigModal ? 
          <Button variant="success" onClick={props.download}>Download as File</Button> :
          <Button variant="success" ref={target} onClick={() =>  {navigator.clipboard.writeText(props.value);renderTooltip(!showTooltip)}}>
            Copy Invoice
          </Button>}
          {props.isConfigModal ? "" :
          <a href={"lightning:" + props.value} >
            <Button className="walletbutton" variant="success">
              Open in Wallet
            </Button>
          </a>
          }
           


          <Overlay target={target.current} transition={true} show={showTooltip} placement="top">
            {(propsTooltip) => (
            <Tooltip id="copied-tooltip" {...propsTooltip}>
              Copied!
            </Tooltip>
            )}
          </Overlay>
        </Modal.Footer>
      </Modal>
      <EmailModal
        show={visibleEmailModal} 
        handleClose={closeEmailModal}
        sendEmail={(data) => props.sendEmail(data)}
      />
      
    </div>
    
  )
  

}


  


export default InvoiceModal
