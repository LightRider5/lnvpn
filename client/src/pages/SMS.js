import { React, useState, useEffect } from "react";
import { HeaderInfo } from "../components";
import * as Component from "../components";
import {
  Container,
  Spinner,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
} from "react-bootstrap";
import { smscountrymap } from "../data/smscountrymap";
import axios from "axios";
import OrderStatus from "../components/OrderStatus";

const SMS = () => {
  const [country, updateCountry] = useState(0);
  const [service, updateService] = useState("vk");
  const [order, updateOrder] = useState(0);
  const [paidOrder, updatePaidOrder] = useState(0);
  const [orderStatus, updateOrderStatus] = useState(false);
  const [spinner, renderSpinner] = useState(false);
  const showSpinner = () => renderSpinner(true);
  const hideSpinner = () => renderSpinner(false);
  const createorder = () => updateOrderStatus(true);
  const cancelorder = () => {
    updateOrder(0);
    updateOrderStatus(0);
  };

  const countrySelect = (e) => {
    if (!isNaN(e.target.value)) {
      updateCountry(e.target.value);
    }
  };

  const serviceSelect = (e) => {
    updateService(e.target.value);
  };

  const createReceiveOrder = async (country, service) => {
    smscountrymap.forEach((array) => {
      if (array.cc == country) {
        country = array.country;
      }
    });
    return axios({
      method: "post",
      url: "https://api2.sms4sats.com/createorder",
      // headers: { "X-Api-Key": process.env.INVOICE_KEY},
      data: {
        country: country,
        service: service,
        isRental: false,
        realphone: false,
        ref: "lnvpn@getalby.com",
      },
    })
      .then(function (response) {
        const order = response.data;
        updateOrder(order);
        hideSpinner();
      })
      .catch((error) => error);
  };

  useEffect(() => {
    let interval = setInterval(() => {
      const fetchData = async () => {
        const response = await fetch(
          `https://api2.sms4sats.com/orderstatus?orderId=${order.orderId}`
        );
        const newData = await response.json();
        updatePaidOrder(newData);
      };
      if (orderStatus === true) {
        fetchData();
      }
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, [order, paidOrder, orderStatus]);

  return (
    <div>
      <Component.SEO
        title="LN SMS - Get one time SMS code"
        description="Get a throw away SMS receive number for verification codes"
        name="@ln_vpn"
        type="summary"
      />
      <title>LN SMS - Get one time SMS code</title>
      <h1>LN SMS</h1>
      <Container className="main-middle">
        <Row>
          <HeaderInfo
            headline="Select a country ➞ Select a service ➞ Pay with Lightning ➞ Receive Activation Code ✔"
            paragraph="You can choose between many services and countries"
          />
          {order ? null : (
            <Form>
              <Form.Group className="mb-2 s4s-selector">
                <Row xs={1} sm={2} md={2}>
                  <Col>
                    <InputGroup>
                      <InputGroup.Text>Country</InputGroup.Text>
                      <Component.CountrySelector
                        countries={smscountrymap}
                        onChange={countrySelect}
                      />
                    </InputGroup>
                  </Col>
                  <Col>
                    <InputGroup>
                      <InputGroup.Text>Service</InputGroup.Text>
                      <Component.ServiceSelector
                        selectedCountry={country}
                        onChange={serviceSelect}
                      />
                    </InputGroup>
                  </Col>
                </Row>
              </Form.Group>
            </Form>
          )}
        </Row>
        {spinner ? (
          <Spinner animation="border" size="md" />
        ) : (
          <OrderStatus order={order} paidOrder={paidOrder} />
        )}
        <Component.Price use={false} value={3000} />
        <div className="main-buttons">
          {order ? (
            <Button
              size="lg"
              variant="danger"
              onClick={() => {
                cancelorder();
                // window.location.reload(false)
              }}
            >
              Cancel Order
            </Button>
          ) : (
            <Button
              size="lg"
              onClick={() => {
                createReceiveOrder(country, service);
                showSpinner();
                createorder();
              }}
              variant="success"
            >
              Pay with Lightning
            </Button>
          )}
        </div>

        <Component.Footer />
      </Container>
    </div>
  );
};

export default SMS;
