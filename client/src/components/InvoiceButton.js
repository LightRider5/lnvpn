import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5001";
const socket = socketIOClient(ENDPOINT);

const InvoiceButton = () => {
  //const [response, setResponse] = useState("");

    const getInvoice = () => {
      socket.emit("getInvoice", amount => {
      
      });
    }


  return (
    <div>
      <Button onClick={getInvoice} className="btn_">Get Invoice</Button>
    </div>
  )
}

export default InvoiceButton
