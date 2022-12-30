import React from "react";
import { Accordion, Container, ListGroup, Col, Row } from "react-bootstrap";
import * as Component from "../components";

const Faq = () => {
  return (
    <div>
      <Component.SEO
        title="LNVPN - Frequently asked Questions about LNVPN"
        description="Everything you need to know about using our ⚡️Lightning⚡️ enabled VPN"
        name="@ln_vpn"
        type="summary"
      />
      <title>FAQ - Frequently asked Questions</title>
      <h1>FAQ</h1>
      <Container>
        <Row xs={1} sm={1} md={1} lg={2}>
          <Col>
            <h2 className="faq-headline">VPN</h2>
            <Accordion>
              <Accordion.Item eventKey="011">
                <Accordion.Header>Why should I use a VPN?</Accordion.Header>
                <Accordion.Body>
                  <ListGroup variant="flush" numbered>
                    <ListGroup.Item>
                      Security: A VPN encrypts your internet connection, making
                      it more difficult for hackers to intercept your data. This
                      can be especially useful when using public Wi-Fi networks.
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Privacy: A VPN can help protect your online privacy by
                      hiding your IP address and online activity from your
                      internet service provider (ISP) and other third parties.
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Access to restricted content: Depending on your location,
                      certain websites and online services may be blocked. A VPN
                      can help you access these services by routing your traffic
                      through a server in a different location.
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Bypassing censorship: In some countries, the government
                      censors certain websites and online services. A VPN can
                      help you bypass these restrictions and access the internet
                      freely.
                    </ListGroup.Item>
                  </ListGroup>
                  It's important to note that VPNs are not a silver bullet for
                  online privacy and security. It's still important to use
                  strong passwords, enable two-factor authentication, and be
                  cautious when clicking on links or downloading files.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="0">
                <Accordion.Header>What is this?</Accordion.Header>
                <Accordion.Body>
                  With LNVPN we've build a very simple VPN pay-as-you-go service
                  paid via Bitcoin Lightning. Instead of paying around 5$ every
                  month with your credit card for the privilege of being able to
                  use a VPN service every now and then we provide you with a VPN
                  connection on servers in different countries for one hour for
                  only 10 cents in US$ -- paid via ⚡!
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>How does it work?</Accordion.Header>
                <Accordion.Body>
                  Very simple: On this website you automatically generate
                  WireGuard VPN keys via JavaScript inside of your browser.
                  After selecting a country where your VPN endpoint should be
                  located and a desired validity of your connection you click
                  "Get Invoice" to get a QR code which you can scan with a
                  Bitcoin Lightning capable wallet like{" "}
                  <a
                    href="https://phoenix.acinq.co/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Phoenix
                  </a>
                  ,{" "}
                  <a href="https://muun.com/" target="_blank" rel="noreferrer">
                    Muun
                  </a>
                  ,{" "}
                  <a
                    href="https://breez.technology/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Breez
                  </a>{" "}
                  or{" "}
                  <a
                    href="https://bluewallet.io/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    BlueWallet
                  </a>
                  . After a successful payment, the website reloads and presents
                  you a new QR code and the message PAID. You can now scan the
                  QR code with the WireGuard App on{" "}
                  <a href="https://play.google.com/store/apps/details?id=com.wireguard.android&hl=de&gl=US">
                    Android Google Play
                  </a>{" "}
                  or on the{" "}
                  <a
                    href="https://apps.apple.com/us/app/wireguard/id1441195209"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Apple App Store
                  </a>
                  . If you want to use the VPN connection on your PC or Mac you
                  can download the WireGuard configuration file to import it
                  into{" "}
                  <a
                    href="https://www.wireguard.com/install/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    WireGuard for Windows and MacOS
                  </a>
                  . Of course you can also use it in{" "}
                  <a
                    href="https://serverspace.io/support/help/how-to-install-wireguard-vpn-client-on-ubuntu-linux/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    CLI/Linux
                  </a>
                  . You can as well send the configuration to yourself via Email
                  to use it later on another device.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  What services did you use to build this, which VPN service do
                  you use?{" "}
                </Accordion.Header>
                <Accordion.Body>
                  For this website, we use the service{" "}
                  <a
                    href="https://legend.lnbits.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    LNBits
                  </a>{" "}
                  for lightning payments, Sendgrid for (optionally) sending
                  WireGuard config file via email, React and socket.IO for
                  WebSockets. On the VPN endpoints we don't use a commercial VPN
                  service. We have our own servers in each country for each
                  endpoint.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  What data do you store about your users? <br></br>How
                  anonymous is this? What privacy do you offer?
                </Accordion.Header>
                <Accordion.Body>
                  On the lnvpn.net website, we don't use cookies and we only
                  store the first half of your ip address in our webserver logs.
                  For example the IP 1.12.123.234 would be stored as 1.12.0.0.
                  On the VPN endpoints we store your WireGuard public key, the
                  PSK and the total amount of bandwidth you used. While you
                  maintain an active connection to a LNVPN VPN endpoint, we have
                  to keep your IP address in memory, but after 5 minutes of
                  inactivity we remove your IP address from memory. We never
                  store it on disk. As payments are only possible via Bitcoin
                  Lightning, we don't know where the money comes from, we can
                  only verify whether an invoice was paid or not 🤷. If you use
                  the "Send via email" feature for your WireGuard configuration,
                  the email is send via{" "}
                  <a
                    href="https://sendgrid.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Sendgrid
                  </a>
                  .
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="4">
                <Accordion.Header>
                  What happens after the timeframe I paid my VPN for?
                </Accordion.Header>
                <Accordion.Body>
                  You won't be able to transfer any data over the VPN connection
                  anymore. Your VPN client may indicate it is successfully
                  connected, though.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="5">
                <Accordion.Header>
                  Is there a data transfer limit?
                </Accordion.Header>
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
                <Accordion.Header>Do you offer an API?</Accordion.Header>
                <Accordion.Body>
                  Yes we do! If you want to use LNVPN for your application to
                  provide VPN tunnels please visit:{" "}
                  <a
                    href="https://lnvpn.net/api/documentation"
                    target="_blank"
                    rel="noreferrer"
                  >
                    https://lnvpn.net/api/api-documentation.
                  </a>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="7">
                <Accordion.Header>Who build this? </Accordion.Header>
                <Accordion.Body>Berlin Bitcoiners with Love ❤️.</Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
          <Col>
            <h2 className="faq-headline">Phone Numbers</h2>
            <Accordion>
              <Accordion.Item eventKey="91">
                <Accordion.Header>
                  Why should I use a burner phone number?
                </Accordion.Header>
                <Accordion.Body>
                  <ListGroup variant="flush" numbered>
                    <ListGroup.Item as="li">
                      Privacy: By using a disposable phone number, you can
                      protect your personal phone number and keep it private.
                      This can be useful when giving out your phone number to
                      strangers or when signing up for online accounts where you
                      don't want to share your real phone number.
                    </ListGroup.Item>
                    <ListGroup.Item as="li">
                      Security: Disposable phone numbers can be used to protect
                      against spam calls, phishing attacks, and other types of
                      phone scams. If you receive a suspicious call or text on a
                      disposable phone number, you can simply discard the number
                      and get a new one.
                    </ListGroup.Item>
                    <ListGroup.Item as="li">
                      Temporary use: One-time usage phone numbers are ideal for
                      temporary or short-term use, such as when you need a phone
                      number for a specific purpose or for a limited time.
                    </ListGroup.Item>
                    <ListGroup.Item as="li">
                      Convenience: It can be convenient to use a disposable
                      phone number when you don't want to give out your personal
                      phone number, or when you need a phone number for a
                      specific purpose but don't want to go through the hassle
                      of getting a new SIM card or phone line.
                    </ListGroup.Item>
                  </ListGroup>
                  Overall, one-time usage phone numbers can be a useful tool for
                  protecting your privacy and security, particularly when
                  engaging in online activities where you want to keep your
                  personal information private.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="8">
                <Accordion.Header>What is this?</Accordion.Header>
                <Accordion.Body>
                  Receive service activations in a few clicks, anonymously 🎉
                  <ListGroup as="ol" numbered>
                    <ListGroup.Item as="li">
                      Pick a Country & Service
                    </ListGroup.Item>
                    <ListGroup.Item as="li">
                      Pay the Lightning Network invoice
                    </ListGroup.Item>
                    <ListGroup.Item as="li">
                      Receive the SMS you requested.
                    </ListGroup.Item>
                  </ListGroup>
                  Note that if you have not received an SMS code successfully,
                  your payment will be canceled automatically and funds will
                  return to your wallet. No refund needed!
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="9">
                <Accordion.Header>How does the refund work? </Accordion.Header>
                <Accordion.Body>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      When invoice is paid by the user, it's not finalized but
                      HELD by the Lightning Node.
                    </ListGroup.Item>
                    <ListGroup.Item>
                      For receive orders, Only when an activation code is
                      successfully received the invoice is SETTLED.
                    </ListGroup.Item>
                    <ListGroup.Item>
                      For send orders, Only when SMS status is "sent or
                      delivered" the invoice is SETTLED.
                    </ListGroup.Item>
                    <ListGroup.Item>
                      If no code is received within 20 minutes, invoice will be
                      CANCELED and funds will automatically return to user's
                      wallet.
                    </ListGroup.Item>
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
        <Component.Footer />
      </Container>
    </div>
  );
};

export default Faq;
