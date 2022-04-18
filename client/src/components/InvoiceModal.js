import React from 'react'
import { useState,useRef} from 'react';
import {QRCodeCanvas} from 'qrcode.react'
import {Modal,Button,Spinner,Overlay,Tooltip,Collapse}from 'react-bootstrap'

function InvoiceModal(props) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [openCollapse, setOpen] = useState(false);
  const target = useRef(null);
   
  if(!props.show){
     return null
   } 

  if(props.value === (undefined || null)){
    return (
      <div>
        <Modal show={props.show} onHide={props.handleClose}>
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
        keyboard={false}>
        <Modal.Header closeButton> 
        {props.isConfigModal ? 
          <Modal.Title>Scan or download config</Modal.Title>:
          <Modal.Title>Scan or copy invoice</Modal.Title> 
          }
        </Modal.Header>
        <Modal.Body>{props.showSpinner ? <Spinner animation="border" /> : <QRCodeCanvas value={props.value} size={256} />}
        <Collapse in={openCollapse}>
          <div id="example-collapse-text">
          {props.showSpinner ? null : <div id="invoicestring" className="container">{props.value}</div>}
          </div>
        </Collapse>
        </Modal.Body>
        <Modal.Footer>
          {props.isConfigModal ? 
          <Button variant='primary'>Send via Email</Button>
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
          >Show Config
          </Button> :
          <Button
            onClick={() => setOpen(!openCollapse)}
            aria-controls="example-collapse-text"
            aria-expanded={!openCollapse}
          > Show PR
          </Button>}

          {/*Render Copy Invoice or Download button  */}
          {props.isConfigModal ? 
          <Button variant="primary" onClick={props.download}>Download File</Button> :
          <Button variant="primary" ref={target} onClick={() =>  {navigator.clipboard.writeText(props.value);setShowTooltip(!showTooltip)}}>
            Copy Invoice
          </Button>}

          <Overlay target={target.current} transition={true} show={showTooltip} placement="top">
            {(propsTooltip) => (
            <Tooltip id="copied-tooltip" {...propsTooltip}>
              Copied!
            </Tooltip>
            )}
          </Overlay>
        </Modal.Footer>
      </Modal>
      
    </div>
    
  )
  

}


  


export default InvoiceModal
