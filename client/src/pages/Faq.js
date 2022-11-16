import React from 'react'
import { Accordion, Container, ListGroup } from 'react-bootstrap'
import * as Component from '../components';


const Faq = () => {

  return (
    <div>
      
      <Component.SEO 
      title='LNVPN - Frequently asked Questions about LNVPN'
      description='Everything you need to know about using our ⚡️Lightning⚡️ enabled VPN'
      name='@ln_vpn'
      type='summary'
      />
      <Container className="main-middle">
        {/* <h2>📖&ensp;FAQ&ensp;📖 </h2> */}
        <Accordion>
            <Accordion.Item eventKey="0">
                <Accordion.Header>What is this?</Accordion.Header>
                    <Accordion.Body>
                    With LNVPN we've build a very simple VPN pay-as-you-go service paid via Bitcoin Lightning. Instead of paying around 5$ every month with your credit card for the privilege of being able to use a VPN service every now and then we provide you with a VPN connection on servers in different countries for one hour for only 10 cents in US$ -- paid via ⚡!
                    </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
                <Accordion.Header>How does it work?</Accordion.Header>
                    <Accordion.Body>
                    Very simple: On this website you automatically generate WireGuard VPN keys via JavaScript inside of your browser. After selecting a country where your VPN endpoint should be located and a desired validity of your connection you click "Get Invoice" to get a QR code which you can scan with a Bitcoin Lightning capable wallet like <a href="https://phoenix.acinq.co/" target="_blank" rel="noreferrer">Phoenix</a>, <a href="https://muun.com/" target="_blank" rel="noreferrer">Muun</a>, <a href="https://breez.technology/" target="_blank" rel="noreferrer">Breez</a> or <a href="https://bluewallet.io/" target="_blank" rel="noreferrer">BlueWallet</a>. After a successful payment, the website reloads and presents you a new QR code and the message PAID. You can now scan the QR code with the WireGuard App on <a href="https://play.google.com/store/apps/details?id=com.wireguard.android&hl=de&gl=US">Android Google Play</a> or on the <a href="https://apps.apple.com/us/app/wireguard/id1441195209" target="_blank" rel="noreferrer">Apple App Store</a>. If you want to use the VPN connection on your PC or Mac you can download the WireGuard configuration file to import it into <a href="https://www.wireguard.com/install/" target="_blank" rel="noreferrer">WireGuard for Windows and MacOS</a>. Of course you can also use it in <a href="https://serverspace.io/support/help/how-to-install-wireguard-vpn-client-on-ubuntu-linux/" target="_blank" rel="noreferrer" >CLI/Linux</a>. You can as well send the configuration to yourself via Email to use it later on another divice.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                <Accordion.Header>What services did you use to build this, which VPN service do you use? </Accordion.Header>
                    <Accordion.Body>
                   For this website, we use the service <a href="https://legend.lnbits.com/" target="_blank" rel="noreferrer">LNBits</a> for lightning payments, Sendgrid for (optionally) sending WireGuard config file via email, React and socket.IO for WebSockets.
                        On the VPN endpoints we don't use a commercial VPN services but have rented virtual servers with <a href="https://github.com/Mawthuq-Software/wireguard-manager-and-api" target="_blank" rel="noreferrer">Wireguard Manager And API</a> managing the WireGuard setup and keys.         
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="3">
                <Accordion.Header>What data do you store about your users? <br></br>How anonymous is this? What privacy do you offer?</Accordion.Header>
                    <Accordion.Body>
                   On the lnvpn.net website, we don't use cookies and we only store the first half of your ip address in our webserver logs. For example the IP 1.12.123.234 would be stored as 1.12.0.0.
                        On the VPN endpoints we store your WireGuard public key, the PSK and the total amount of bandwidth you used. While you maintain an active connection to a LNVPN VPN endpoint, we have to keep your IP address in memory, but after 5 minutes of inactivity we remove your IP address from memory. We never store it on disk.
                        As payments are only possible via Bitcoin Lightning, we don't know where the money comes from, we can only verify whether an invoice was paid or not 🤷.
                        If you use the "Send via email" feature for your WireGuard configuration, the email is send via <a href="https://sendgrid.com/" target="_blank" rel="noreferrer">Sendgrid</a>.        
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="4">
                <Accordion.Header>What happens after the timeframe I paid my VPN for?</Accordion.Header>
                    <Accordion.Body>
                   You won't be able to transfer any data over the VPN connection anymore. Your VPN client may indicate it is successfully connected, though.
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="5">
                <Accordion.Header>Is there a data transfer limit?</Accordion.Header>
                    <Accordion.Body>
                     <h6>Currently, we have four data plans:</h6>
                          <ListGroup>
                            <ListGroup.Item>1 hour = 1GB</ListGroup.Item>
                            <ListGroup.Item>1 day = 5GB</ListGroup.Item>
                            <ListGroup.Item>1 week = 15GB</ListGroup.Item>
                            <ListGroup.Item>1 month = 40GB</ListGroup.Item>
                            <ListGroup.Item>3 months = 90GB</ListGroup.Item>
                            </ListGroup>
                    </Accordion.Body>
                  </Accordion.Item>
                    <Accordion.Item eventKey="6">
                <Accordion.Header>Who build this? </Accordion.Header>
                    <Accordion.Body>
                    Berlin Bitcoiners with Love ❤️.
                    </Accordion.Body>
            </Accordion.Item>
              </Accordion>
              <Component.Footer/>
    </Container>
    </div>
  )
}

export default Faq
