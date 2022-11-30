import {React,useState, useEffect } from 'react'
import { HeaderInfo } from '../components'
import * as Component from '../components';
import { Container, Row, Col,Button } from 'react-bootstrap';
import { smscountrymap } from '../data/smscountrymap';
import axios from 'axios';
import OrderStatus from '../components/OrderStatus';


const SMS = () => {

  const [country, updateCountry] = useState(0)
  const [service, updateService] = useState("vk")
  const [order, updateOrder] = useState(0)
  const [paidOrder, updatePaidOrder] = useState([]);

  
  const countrySelect = (e) => {
    if(!isNaN(e.target.value)) {
    updateCountry(e.target.value)
    }
  }

  const serviceSelect = (e) => {
      updateService(e.target.value)
  }

  const createReceiveOrder = async (country, service) => { 
    console.log(toString(country), service)
    return axios({
        method: "post",
        url: "https://api2.sms4sats.com/createorder",
        // headers: { "X-Api-Key": process.env.INVOICE_KEY},
        data: {
          "country": "Germany",
          "service": service,
          "isRental": false,
          "realphone": false,
          "ref": "lnvpn@getalby.com"
        }
          }).then(function (response){
            const order = response.data;
            console.log(order)
            updateOrder(order)
          }).catch(error => error);

  }

  useEffect(() => {
	let interval = setInterval(() => {
    const fetchData = async () => {
        console.log(order.orderId)  
        const response = await fetch(`https://api2.sms4sats.com/orderstatus?orderId=${order.orderId}`);
            const newData = await response.json();
            updatePaidOrder(newData);
        console.log(paidOrder)
        };
        fetchData();
	}, 4000);
	return () => {
		clearInterval(interval);
	};
    }, [order, paidOrder]);
  
  return (
      <div>
           <Component.SEO
            title="LNVPN - Get one time SMS code"
            description="Get a throw away SMS receive number for verification codes"
            name="@ln_vpn"
            type="summary"
            />
                <Container className="main-middle">
                    <Row>
                        <Col>
                            <HeaderInfo
                                headline="Select a country ➡️ Select a service ➡️ Pay with Lightning ➡️ Receive Activation Code ✅"
                                paragraph="You can choose between many services and countries"
                      />
                      <Component.CountrySelector
                        countries={smscountrymap}
                        onChange={countrySelect}
                      />
                      <Component.ServiceSelector
                        selectedCountry={country}
                        onChange={serviceSelect}  
            />
            <OrderStatus
              order={order}
              paidOrder={paidOrder}
            />
            <Component.Price
              value={3000}
              symbol={"sats"}
            />
            
            
            <Button
              size='lg'
              onClick={
                () => {
                  createReceiveOrder(country, service);
               
                }
              }
                  
              variant="success">Next
                </Button>
                       </Col>
                 </Row >
        <Component.Footer />
        </Container>
    </div>
  )
}

export default SMS

// q: How to get the order status from the API?
// a: https://api2.sms4sats.com/orderstatus?orderId=123456789