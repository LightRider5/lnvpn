import React from 'react'
import { HeaderInfo } from '../components'
import * as Component from '../components';
import { Container, Row, Col } from 'react-bootstrap';
const SMS = () => {
  return (
      <div>
           <Component.SEO
            title="LNVPN - VPN provider with Lightning only payment"
            description="A simple privacy focused VPN service payable with Bitcoin Lightning"
            name="@ln_vpn"
            type="summary"
            />
                <Container className="main-middle">
                    <Row>
                        <Col>
                            <HeaderInfo
                                headline="Select a country ➡️ Select a service ➡️ Pay with Lightning ➡️ Receive Messages ✅"
                                paragraph="You can choose between many services and countries"
                      />
                       </Col>
                    </Row >
                </Container>
    </div>
  )
}

export default SMS
