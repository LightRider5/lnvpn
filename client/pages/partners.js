import React from 'react'
import { useState, useRef } from 'react'
import Head from 'next/head'
import { InputGroup, Form, Spinner, Button, Overlay, Tooltip } from 'react-bootstrap'
import { validate } from 'bitcoin-address-validation'
import AlertModal from '../components/AlertModal'
import { io } from "socket.io-client";
import { IoIosCopy } from "react-icons/io";
var socket = io.connect(process.env.NEXT_PUBLIC_socket_port);

const partners = () => {

    const [showTooltipID, setShowTooltipID] = useState(false);
    const targetID = useRef(null);
    const renderTooltipID = (show) => {
        setShowTooltipID(show);
        setTimeout(() => setShowTooltipID(false), [1000]);
    };

    const [custom_code, setCustomCode] = useState('')
    const [payoutAddress, setPayoutAddress] = useState('')
    const [custom_code_link, setCustomCodeLink] = useState('')


    const [step, setStep] = useState(1);
    //////Alert - Modal
    const [alertModalparams, showAlertModal] = useState({
        show: false,
        text: "",
        type: "",
    });
    const hideAlertModal = () =>
        showAlertModal({ show: false, text: "", type: "" });

    const addAddressToDB = async (payoutAddress, custom_code) => {
        if (custom_code === '') {
            showAlertModal({
                show: true,
                text: 'Please enter a referral code',
                type: "danger",
            });
            return
        }

        if (validate(payoutAddress) === false) {
            showAlertModal({
                show: true,
                text: 'Invalid Bitcoin Address',
                type: "danger",
            });
            return
        }
        setCustomCodeLink(`https://lnvpn.net?ref=${custom_code}`);
        setStep(2);
        socket.emit("addAddressCode", payoutAddress, custom_code);
    }


    socket.off("addAddressCodeSuccess").on("addAddressCodeSuccess", (data) => {
        console.log(data);
        setStep(3);
    });

    socket.off("addAddressCodeError").on("addAddressCodeError", (errorMessage) => {
        // Set the step back to 1 to allow the user to try again
        setStep(1);

        // Show the error message using the AlertModal
        showAlertModal({
            show: true,
            text: errorMessage,
            type: "danger",
        });
    });


    return (

        <>
            {/* <Head>
                <meta name="description" content="Experience true online privacy with our ultra-secure VPN service, payable exclusively with Bitcoin Lightning. Fast, anonymous, and easy to use - pay as you go with no subscriptions required." />
                <title>LNVPN - Privacy by Design</title>
                <meta name="keywords" content="Bitcoin, Lightning, VPN" />
            </Head> */}

            <Head>
                <title>LNVPN - Partners</title>
                <meta name="keywords" content="VPN, Bitcoin, Lightning,Earn Bitcoin, Affiliate, Refferal" />
                <meta property="og:title" content="LNVPN - Privacy by Design" />
                <meta property="og:type" content="website" />
                <meta property="og:image" content="https://lnvpn.net/brand-logo.jpg" />
                <meta property="og:description" content="Experience true online privacy with our ultra-secure VPN service, payable exclusively with Bitcoin Lightning. Fast, anonymous, and easy to use - pay as you go with no subscriptions required." />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content="Experience true online privacy with our ultra-secure VPN service, payable exclusively with Bitcoin Lightning. Fast, anonymous, and easy to use - pay as you go with no subscriptions required.s" />
                <meta name="twitter:description" content="LNVPN - A Lightning Network enabled VPN service with true privacy." />
                <meta name="twitter:image" content="https://lnvpn.net/brand-logo.jpg" />
            </Head>

            <div className='container fluid progamm-container'>



                {step === 1 && (
                    <>
                        <div className='partner-programm-input-container'>
                            <h3>Join the LNVPN Affiliate Program <br></br> and earn 15% from subscription referrals.</h3>
                            <p>Generate your affiliate link below. Promote and start earning Bitcoin rewards!</p>
                            <InputGroup className='partner-programm-input'  >
                                <Form.Label className='mt-2'>Type your preferred referral code:</Form.Label>
                                <div className='partner-programm-input-item'>

                                    <InputGroup.Text required>https://lnvpn.net?ref=</InputGroup.Text>
                                    <Form.Control
                                        size="lg"
                                        value={custom_code}
                                        placeholder="your-code"
                                        onChange={(e) => setCustomCode(e.target.value)}
                                    />
                                </div>
                                <Form.Label className='mt-3'>This address is where we will payout your referral earnings.</Form.Label>
                                <div className='partner-programm-input-item'>
                                    <InputGroup.Text required>Bitcoin Address</InputGroup.Text>
                                    <Form.Control
                                        size="lg"
                                        value={payoutAddress}
                                        placeholder="Receiver Address"
                                        onChange={(e) => setPayoutAddress(e.target.value)}
                                    />
                                </div>
                            </InputGroup>
                            <div className='partner-programm-buttons'>
                                <Button

                                    size="lg"
                                    variant="success"
                                    onClick={() => {
                                        addAddressToDB(payoutAddress, custom_code)
                                    }}>
                                    Submit  </Button>
                            </div>
                        </div>
                    </>
                )}
                {step === 2 && (
                    <div className='partner-programm-spinner'>
                        <Spinner animation="border" role="status">

                        </Spinner>
                        <p className="sr-only">Waiting...</p>
                    </div>
                )}
                {step === 3 && (
                    <div className='partner-programm-input-container'>
                        <div className='partner-programm-success'>
                            <h3>Congrats! You are part of the LNVPN Affiliate Program!</h3>
                            <h5>Your personal referral code is: <b><span>{custom_code}</span></b></h5>
                            You will find your affiliate link below. Copy and share to start earning Bitcoin rewards!
                            <br></br>


                            <Form className="order-ID">
                                <Form.Group className="m-2">
                                    <InputGroup>
                                        <InputGroup.Text>Your Personal Ref-Link</InputGroup.Text>
                                        <Form.Control
                                            size="lg"
                                            disabled value={custom_code_link} />
                                        <Button
                                            size={30}
                                            ref={targetID}
                                            onClick={() => {
                                                navigator.clipboard.writeText(custom_code_link);
                                                renderTooltipID(!showTooltipID);
                                            }}
                                            variant="primary"
                                        >
                                            <IoIosCopy color="black" />
                                        </Button>
                                    </InputGroup>
                                </Form.Group>
                            </Form>
                            <p>Share this link to earn Bitcoin rewards!</p>
                        </div>
                    </div>
                )}
            </div>
            <AlertModal
                show={alertModalparams.show}
                text={alertModalparams.text}
                variant={alertModalparams.type}
                handleClose={hideAlertModal}
            />
            <Overlay
                target={targetID.current}
                transition={true}
                show={showTooltipID}
                placement="bottom"
            >
                {(propsTooltip) => (
                    <Tooltip id="copied-tooltip" {...propsTooltip}>
                        Copied!
                    </Tooltip>
                )}
            </Overlay>
        </>
    )
}

export default partners
