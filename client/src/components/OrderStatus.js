import {React,useState,useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Spinner, Alert,Button,Overlay,Tooltip,Form,InputGroup } from 'react-bootstrap'
import {IoIosCopy} from 'react-icons/io'



const OrderStatus = (props) => {
    const [showTooltipInvoice, setShowTooltipInvoice] = useState(false);
    const targetInvoice = useRef(null);

    const [showTooltipID, setShowTooltipID] = useState(false);
    const targetID = useRef(null);

    const [showTooltipID2, setShowTooltipID2] = useState(false);
    const targetID2 = useRef(null);

    const [showTooltipNumber, setShowTooltipNumber] = useState(false);
    const targetNumber = useRef(null);

    const renderTooltipID = (show) => {
    setShowTooltipID(show)
    setTimeout(() => setShowTooltipID(false), [1000])
    }

    const renderTooltipID2 = (show) => {
    setShowTooltipID2(show)
    setTimeout(() => setShowTooltipID2(false), [1000])
    }

    const renderTooltipNumber = (show) => {
    setShowTooltipNumber(show)
    setTimeout(() => setShowTooltipNumber(false), [1000])
    }

    const renderTooltipInvoice = (show) => {
    setShowTooltipInvoice(show)
    setTimeout(() => setShowTooltipInvoice(false), [1000])
    }
    
    if (props.order === 0) { 
        return null
    }
    
    if (props.order) {

        return (
            <div>
                {
                    props.paidOrder.paid ?
                        <div className="order-status-canvas">
                            <Form className="order-ID">
                                <Form.Group className="mb-2">
                                    <InputGroup>
                                        <InputGroup.Text>Order ID</InputGroup.Text>
                                        <Form.Control 
                                        value={props.order.orderId}
                                        />
                                    <Button
                                        size={30}
                                        ref={targetID}
                                        onClick={() => {
                                        navigator.clipboard.writeText(props.order.orderId);
                                        renderTooltipID(!showTooltipID)
                                        }}
                                        variant="primary"
                                        >
                                            <IoIosCopy color="black"/>
                                        {/* <IoIosRefresh
                                        color="black"
                                        size={20}
                                        title="renew keys"
                                            /> */}
                                            
                                    </Button>
                                    </InputGroup>        
                                </Form.Group>
                                </Form>
                            {props.paidOrder.error ?
                                <Alert variant="danger">{props.paidOrder.error}</Alert> :
                                <div>
                                    <Form className="order-ID">
                                    <Form.Group className="mb-2">
                                        <InputGroup>
                                            <InputGroup.Text>Your phone number:</InputGroup.Text>
                                            <Form.Control 
                                            value={props.paidOrder.number}
                                            />
                                        <Button
                                            size={30}
                                            ref={targetNumber}
                                            onClick={() => {
                                            navigator.clipboard.writeText(props.paidOrder.number);
                                            renderTooltipNumber(!showTooltipNumber)
                                            }}
                                            variant="primary"
                                            >
                                                <IoIosCopy color="black"/>        
                                        </Button>
                                        </InputGroup>        
                                    </Form.Group>
                                </Form>
                                    {props.paidOrder.code ?
                                        <Alert variant="success">Received activation code: {props.paidOrder.code}</Alert> :
                                        <div>
                                            <p>No code received yet</p>
                                            <Spinner animation="border" />
                                        </div>
                                    }
                                </div>}        
                            
                </div>        
                        :
                        <div className="order-status-canvas">
                            <Form className="order-ID">
                                <Form.Group className="mb-2">
                                    <InputGroup>
                                        <InputGroup.Text>Order ID</InputGroup.Text>
                                        <Form.Control 
                                        value={props.order.orderId}
                                        />
                                    <Button
                                        size={30}
                                        ref={targetID2}
                                        onClick={() => {
                                        navigator.clipboard.writeText(props.order.orderId);
                                        renderTooltipID2(!showTooltipID2)
                                        }}
                                        variant="primary"
                                        >
                                            <IoIosCopy color="black"/>        
                                    </Button>
                                    </InputGroup>        
                                </Form.Group>
                            </Form>
                         
                            <p>
                                This QR-Code is a Lightning invoice. Pay with a Wallet like <a href="https://phoenix.acinq.co/" target="_blank" rel="noreferrer">Phoenix</a>, <a href="https://muun.com/" target="_blank" rel="noreferrer">Muun</a>, <a href="https://breez.technology/" target="_blank" rel="noreferrer">Breez</a> or <a href="https://bluewallet.io/" target="_blank" rel="noreferrer">BlueWallet</a>.  
                                You can also pay with a browser extension like <a href="https://getalby.com/" target="_blank" rel="noreferrer">Alby</a>.    
                            </p>
                            <a href={"lightning:" + props.order.payreq}>
                            <QRCodeCanvas value={props.order.payreq} size={256} />
                            </a>
                            <Button
                                className="copy-button"
                                ref={targetInvoice}
                                variant="primary"
                                size={30}
                                onClick={() => {
                                    navigator.clipboard.writeText(props.order.payreq);
                                    renderTooltipInvoice(!showTooltipInvoice)
                                }}
                            >
                                <IoIosCopy color="black"/>
                            </Button>
                </div >
                }
             <Alert variant="light">Note that if you have not received a SMS code successfully after 20min, your payment will be canceled automatically and funds will return to your wallet. No refund needed!</Alert>
                
                <Overlay target={targetInvoice.current} transition={true} show={showTooltipInvoice} placement="right">
                {(propsTooltip) => (
                <Tooltip id="copied-tooltip" {...propsTooltip}>
                Copied!
                </Tooltip>
                )}
                </Overlay>

                <Overlay target={targetID.current} transition={true} show={showTooltipID} placement="bottom">
                    {(propsTooltip) => (
                    <Tooltip id="copied-tooltip" {...propsTooltip}>
                    Copied!
                    </Tooltip>
                    )}
                </Overlay>

                <Overlay target={targetID2.current} transition={true} show={showTooltipID2} placement="bottom">
                    {(propsTooltip) => (
                    <Tooltip id="copied-tooltip" {...propsTooltip}>
                    Copied!
                    </Tooltip>
                    )}
                </Overlay>

                <Overlay target={targetNumber.current} transition={true} show={showTooltipNumber} placement="bottom">
                    {(propsTooltip) => (
                    <Tooltip id="copied-tooltip" {...propsTooltip}>
                    Copied!
                    </Tooltip>
                    )}
                </Overlay>

            </div>
            
        )
        
    }
}

export default OrderStatus


