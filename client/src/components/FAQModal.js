import React from 'react'
import {Modal,Button,ListGroup} from 'react-bootstrap'


const FAQModal = (props) => {

  if(!props.show){
      
    return (null)
  } 


  return (
    <div>

    <Modal
      id="faq_modal" 
      show={props.show} 
      onHide={props.handleClose}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          FAQ
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
            <h4>What is this?</h4>
            <p>With LNVPN we've build a very simple VPN pay-as-you-go service paid via Bitcoin Lightning. Instead of paying around 5$ every month with your credit card for the piviledge of being able to use a VPN service every now and then we provide you with a VPN connection on servers in different countries for one hour for only 10 cents in US$ -- paid via ⚡!</p>
            
            <h4>How does it work?</h4>
            <p>
            Very simple: On this website you automatically generate WireGuard VPN keys via JavaScript inside of your browser. After selecting a country where your VPN endpoint should be located and a desired validity of your connection you click "Get Invoice" to get a QR code which you can scan with a Bitcoin Lightning capable wallet like <a href="https://phoenix.acinq.co/">Phoenix</a>, <a href="https://muun.com/">Muun</a>, <a href="https://breez.technology/">Breez</a> or <a href="https://bluewallet.io/">BlueWallet</a>. After a successful payment, the website reloads and presents you a new QR code and the message PAID. You can now scan the QR code with the WireGuard App on <a href="https://play.google.com/store/apps/details?id=com.wireguard.android&hl=de&gl=US">Android Google Play</a> or on the <a href="https://apps.apple.com/us/app/wireguard/id1441195209">Apple App Store</a>. If you want to use the VPN connection on your PC or Mac you can download the WireGuard configuration file to import it into <a href="https://www.wireguard.com/install/">WireGuard for Windows and MacOS</a>. You can as well send the configuration to yourself via Email to use it later on another divice.
            </p>

            <h4> What services did you use to build this, which VPN service do you use?</h4>
            <p>
            For this website, we use the service<a href="https://legend.lnbits.com/">LNBits</a> for lightning payments, Sendgrid for (optionally) sending WireGuard config file via email, React and socket.IO for WebSockets.
            On the VPN endpoints we don't use a commercial VPN service but our rented virtual servers from Hetzner (FI and US), Contabo (SG) and OVH (UK and CA) with <a href="https://github.com/Mawthuq-Software/wireguard-manager-and-api">Wireguard Manager And API</a> managing the WireGuard setup and keys.
            </p>

            <h4>What data do you store about your users? How anonymous is this? What privacy do you offer?</h4>
            <p>
            On the lnvpn.net website, we don't use cookies and we only store the first half of your ip address in our webserver logs. For example the IP 1.12.123.234 would be stored as 1.12.0.0.
            On the VPN endpoints we store your WireGuard public key, the PSK and the total amount of bandwidth you used. While you maintain an active connection to a LNVPN VPN endpoint, we have to keep your IP address in memory, but after 5 minutes of inactivity we remove your IP address from memory. We never store it on disk.
            As payments are only possible via Bitcoin Lightning, we don't know where the money comes from, we can only verify whether an invoice was paid or not 🤷.
            If you use the "Send via email" feature for your WireGuard configuration, the email is send via <a href="https://sendgrid.com/">Sendgrid</a>.
            </p>
            <h4>What happens after the timeframe I paid my VPN for?</h4>
            <p>
            You won't be able to transfer any data over the VPN connection anymore. Your VPN client may indicate it is successfully connected, though.
            </p>

            <h4>Is there a data transfer limit?</h4>
            <p>
            Currently, we have four data plans:
              <ul id="dataplanlist">
                  <li>1 hour = 1GB</li>
                  <li>1 day = 5GB</li>
                  <li>1 week = 10GB</li>
                  <li>1 month = 30GB</li>
              </ul>
            </p>

            <h4>Who build this?</h4>
            <p>
            Berlin Bitcoiner
            </p>

               

        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={props.handleClose}>Close</Button>
      </Modal.Footer>
    </Modal>
      
    </div>
  )
}

export default FAQModal
