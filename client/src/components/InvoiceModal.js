import React from 'react'
import { useState,useRef} from 'react';
import {QRCodeCanvas} from 'qrcode.react'
import {Modal,Button,Spinner,Overlay,Tooltip,Collapse}from 'react-bootstrap'
import EmailModal from './EmailModal';

function InvoiceModal(props) {
  const [visibleEmailModal, setShowEmailModal] = useState(false);
  const closeEmailModal = () => setShowEmailModal(false);
  const showEmailModal = () => setShowEmailModal(true);

  const initialStateTooltip = false;
  const [showTooltip, setShowTooltip] = useState(initialStateTooltip);
  const [openCollapse, setOpen] = useState(false);
  const target = useRef(null);


  const renderTooltip = (show) => {
    setShowTooltip(show)
    setTimeout(() => setShowTooltip(initialStateTooltip), [1000])
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
        <Modal.Title>Scan or download config</Modal.Title>:
        <Modal.Title>Scan or copy invoice</Modal.Title> 
          }
        </Modal.Header>
        <Modal.Body>{props.showSpinner ? <Spinner animation="border" /> : <QRCodeCanvas value={props.value} size={256} />}
        {props.isConfigModal ?
         <h3 id="paid_message">PAID</h3> :
        <p>Once the invoice is paid, don't close the site. We don't store session data and can't restore yours.</p>
          }
        <Collapse in={openCollapse}>
          <div id="example-collapse-text">
          {props.showSpinner ? null : <div id="invoicestring" className="container">{props.value}</div>}
          </div>
        </Collapse>
        </Modal.Body>
        <Modal.Footer>
          {props.isConfigModal ? 
          <Button variant='primary' onClick={()=> {showEmailModal(true)}}>Send via Email</Button>
          :
          <Button variant="secondary" onClick={props.showNewInvoice}>
            Get new Invoice
          </Button>}

          {/*Render Show Config or Show PR button  */}
          {props.isConfigModal ? 
          <Button 
            variant="primary"
            onClick={() => setOpen(!openCollapse)}
            aria-controls="example-collapse-text"
            aria-expanded={!openCollapse}
          >{!openCollapse ? 'Show Config' : 'Hide Config'}
          </Button> :
          <Button
            onClick={() => setOpen(!openCollapse)}
            aria-controls="example-collapse-text"
            aria-expanded={!openCollapse}
          >{!openCollapse ? 'Show PR' : 'Hide PR'}
          </Button>}

          {/*Render Copy Invoice or Download button  */}
          {props.isConfigModal ? 
          <Button variant="primary" onClick={props.download}>Download File</Button> :
          <Button variant="primary" ref={target} onClick={() =>  {navigator.clipboard.writeText(props.value);renderTooltip(!showTooltip)}}>
            Copy Invoice
          </Button>}
          {props.isConfigModal ? "" :
          <a href={"lightning:" + props.value} > 
          <Button variant="success">
          Open Wallet
          </Button></a>}


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
