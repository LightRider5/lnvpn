import {React,useState,useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Spinner, Alert,Button,Overlay,Tooltip } from 'react-bootstrap'
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
                            <p className="s4s-orderID">Your order ID: <b>{props.order.orderId}</b>
                                <Button
                                    className="copy-button"
                                    variant="primary"
                                    size={30}
                                    ref={targetID}
                                    onClick={() => {
                                        navigator.clipboard.writeText(props.order.orderId);
                                        renderTooltipID(!showTooltipID)
                                    }}
                                >
                                 <IoIosCopy color="black"/>
                                </Button>
                            </p>
                            {props.paidOrder.error ?
                                <Alert variant="danger">{props.paidOrder.error}</Alert> :
                                <div>
                                    <p id="s4s-telephone-number">Your phone number: {props.paidOrder.number}
                                    <Button
                                        className="copy-button"
                                        variant="primary"
                                        size={30}
                                        ref={targetNumber}
                                        onClick={() => {
                                            navigator.clipboard.writeText(props.paidOrder.number);
                                            renderTooltipNumber(!showTooltipNumber)
                                    }}
                                        >
                                            <IoIosCopy color="black"/>
                                </Button>
                                    </p>
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
                <div  className="order-status-canvas">
                            <p className="s4s-orderID">Your order ID: {props.order.orderId}
                                <Button
                                    className="copy-button"
                                    variant="primary"
                                    size={30}
                                    ref={targetID2}
                                    onClick={() => {
                                        navigator.clipboard.writeText(props.order.orderId);
                                        renderTooltipID2(!showTooltipID2)
                                    }}
                                >
                                 <IoIosCopy color="black"/>
                                </Button>
                            </p>
                            <p>
                                This QR-Code is a Lightning invoice. Pay with a Wallet like <a href="https://phoenix.acinq.co/" target="_blank">Phoenix</a>, <a href="https://muun.com/" target="_blank">Muun</a>, <a href="https://breez.technology/" target="_blank">Breez</a> or <a href="https://bluewallet.io/" target="_blank">BlueWallet</a>.  
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
             <Alert variant="light">Note that if you have not received an SMS code successfully, your payment will be canceled automatically and funds will return to your wallet. No refund needed!</Alert>
                
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


