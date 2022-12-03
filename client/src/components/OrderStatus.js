import {React } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { Spinner, Alert } from 'react-bootstrap'
import * as Component from '../components';



const OrderStatus = (props) => {
    if (props.order === 0) { 
        return null
    }
    if (props.order) {

        return (
            <div>
                {
                    props.paidOrder.paid ?
                <div>
                            <p className="s4s-orderID">Your order ID: {props.order.orderId}</p>
                            {props.paidOrder.error ?
                                <Alert variant="danger">{props.paidOrder.error}</Alert> :
                                <div>
                                    <p id="s4s-telephone-number">Your phone number: +{props.paidOrder.number}</p>
                                    {props.paidOrder.code ?
                                        <p id="s4s-activation code">Received activation code: {props.paidOrder.code}</p> :
                                        <div>
                                            <p>No code received yet</p>
                                            <Spinner animation="border" />
                                        </div>
                                    }
                                </div>}        
                            
                </div>        
                        :
                <div>
                            <p className="s4s-orderID">Your order ID: {props.order.orderId}</p>
                            <p>
                                This QR-Code is a Lightning invoice. Pay with a Wallet like <a href="https://phoenix.acinq.co/" target="_blank">Phoenix</a>, <a href="https://muun.com/" target="_blank">Muun</a>, <a href="https://breez.technology/" target="_blank">Breez</a> or <a href="https://bluewallet.io/" target="_blank">BlueWallet</a>.  
                            </p>
                            <a href={"lightning:" + props.order.payreq}>
                            <QRCodeCanvas value={props.order.payreq} size={256} />
                            </a>
            
                </div >
                }
             <Alert variant="light">Note that if you have not received an SMS code successfully, your payment will be canceled automatically and funds will return to your wallet. No refund needed!</Alert>
            </div>
        )
    }
}

export default OrderStatus


