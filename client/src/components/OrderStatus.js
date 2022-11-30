import {React, useEffect, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import axios from 'axios'


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
                            <p id="s4s-telephone-number">Your phone number: {props.paidOrder.number}</p>
                            <p id="s4s-activation code">Received activation code: {props.order.code}</p>
                            <p id="s4s-error-message">{props.paidOrder.error }</p>
                </div>        
                        :
                <div>
                            <p className="s4s-orderID">Your order ID: {props.order.orderId}</p>
                            <a href={"lightning:" + props.order.payreq}>
                            <QRCodeCanvas value={props.order.payreq} size={256} />
                            </a>
                </div >
                }
            </div>
        )
    }
}

export default OrderStatus


