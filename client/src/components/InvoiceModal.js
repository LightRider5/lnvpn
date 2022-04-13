import React from 'react'
import { useState,useRef } from 'react';
import {QRCodeCanvas} from 'qrcode.react'
import {Modal,Button,Spinner,Overlay,Tooltip}from 'react-bootstrap'

function InvoiceModal(props) {
  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef(null);
   
  if(!props.show){
     return null
   } 

  if(props.value === undefined){
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
        <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton> 
          <Modal.Title>Scan or copy invoice</Modal.Title>
        </Modal.Header>
        <Modal.Body>{props.showSpinner ? <Spinner animation="border" /> : <QRCodeCanvas value={props.value} size={256} />}
        {props.showSpinner ? null : <div id="invoicestring" className="container">{props.value}</div>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" ref={target} onClick={() =>  {navigator.clipboard.writeText(props.value);setShowTooltip(!showTooltip)}}>
            Copy Invoice
          </Button>
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
