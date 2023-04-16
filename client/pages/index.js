// pages/index.js
import { Row, Col, Container, Button } from "react-bootstrap";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";
import * as Component from "../components";
import { wireguard } from "../wireguard";
import dynamic from 'next/dynamic';

import { getTimeStamp } from "../timefunction.js";
import { vpnendpoints } from "../data/vpnendpoints";
import * as dayjs from "dayjs";

const KeyInput = dynamic(() => import('../components/KeyInput'), { ssr: false });

var socket = io.connect(process.env.NEXT_PUBLIC_socket_port);
let emailAddress;
let clientPaymentHash;
let isPaid = false; //Is only necessary in the case of socket event is fireing multible times

function Home() {

    const generateKeypair = async () => {
        const keypair = await wireguard.generateKeypair();
        return keypair;
    };

    const [keyPair, displayNewPair] = useState(
        generateKeypair()
    );

    useEffect(() => {
        const setInitialKeypair = async () => {
            const initialKeypair = await generateKeypair();
            displayNewPair(initialKeypair);
        };
        setInitialKeypair();
    }, []);

    const [priceDollar, updatePrice] = useState(process.env.NEXT_PUBLIC_price_hour);
    const [country, updateCountry] = useState("0");
    const [showSpinner, setSpinner] = useState(true);
    const [payment_request, setPaymentrequest] = useState(0);
    const [showPaymentSuccessfull, setPaymentAlert] = useState(false);
    ///////Modal Invoice
    const [visibleInvoiceModal, setShowInvoiceModal] = useState(false);
    const closeInvoiceModal = () => setShowInvoiceModal(false);
    const showInvoiceModal = () => setShowInvoiceModal(true);
    ///////Modal Configdata
    const [isConfigModal, showConfigModal] = useState(false);
    const renderConfigModal = () => showConfigModal(true);
    const hideConfigModal = () => showConfigModal(false);
    //////Alert - Modal
    const [alertModalparams, showAlertModal] = useState({
        show: false,
        text: "",
        type: "",
    });
    const hideAlertModal = () =>
        showAlertModal({ show: false, text: "", type: "" });
    //////User

    ///////Successfull payment alert
    const renderAlert = (show) => {
        setPaymentAlert(show);
    };

    //////Updates the QR-Code
    const updatePaymentrequest = () => {
        socket.on("lnbitsInvoice", (invoiceData) => {
            setPaymentrequest(invoiceData.payment_request);
            clientPaymentHash = invoiceData.payment_hash;
            setSpinner(false);
        });
    };

    ////Connect to WebSocket Server
    socket.off("connect").on("connect", () => {
        /////Checks for already paid invoice if browser switche tab on mobile
        if (clientPaymentHash !== undefined) {
            checkInvoice();
        }
    });

    const checkInvoice = () => {
        socket.emit("checkInvoice", clientPaymentHash);
    };

    //Get the invoice
    const getInvoice = (price) => {
        if (country === "0") {
            showAlertModal({
                show: true,
                text: "Please select a country",
                type: "danger",
            });
        } else {
            socket.emit("getInvoice", price);
            showInvoiceModal();
        }
    };
    ///////////GetWireguardConfig
    const getWireguardConfig = (
        publicKey,
        presharedKey,
        priceDollar,
        country
    ) => {
        socket.emit(
            "getWireguardConfig",
            publicKey,
            presharedKey,
            priceDollar,
            country
        );
    };

    socket.off("invoicePaid").on("invoicePaid", (paymentHash) => {
        if (paymentHash === clientPaymentHash && !isPaid) {
            renderAlert(true);
            isPaid = true;
            setSpinner(true);
            getWireguardConfig(
                keyPair.publicKey,
                keyPair.presharedKey,
                priceDollar,
                country
            );
        }
    });

    /////////Get wireguard config from Server
    socket
        .off("reciveConfigData")
        .on("reciveConfigData", (wireguardConfig, timestamp, location) => {
            setSpinner(false);
            setPaymentrequest(
                buildConfigFile(wireguardConfig, timestamp, location).join("\n")
            );
        });
    /////////Construct the Config File
    const buildConfigFile = (serverResponse, timestamp, location) => {
        showInvoiceModal();
        renderConfigModal();
        const configArray = [
            "[Interface]",
            "PrivateKey = " + keyPair.privateKey,
            "Address = " + serverResponse.ipv4Address,
            "DNS = " + serverResponse.dns,
            " ",
            "# Valid until: " + parseDate(timestamp, "YYYY-MMM-DD hh:mm:ss A"),
            "# Location: " + location,
            " ",
            "[Peer]",
            "PublicKey = " + serverResponse.publicKey,
            "PresharedKey = " + keyPair.presharedKey,
            "Endpoint = " +
            serverResponse.ipAddress +
            ":" +
            serverResponse.listenPort,
            "AllowedIPs = " + serverResponse.allowedIPs,
        ];
        return configArray;
    };

    //Change Runtime
    const runtimeSelect = (e) => {
        if (!isNaN(e.target.value)) {
            updatePrice(e.target.value);
        }
    };

    const countrySelect = (e) => {
        if (!isNaN(e.target.value)) {
            updateCountry(e.target.value);
        }
    };

    const download = (filename, text) => {
        const textArray = [text];
        const element = document.createElement("a");
        const file = new Blob(textArray, {
            type: "application/octet-stream",
            endings: "native",
        });
        element.href = URL.createObjectURL(file);
        element.download = filename;
        document.body.appendChild(element);
        element.click();
    };

    const sendEmail = (email, config, date) => {
        socket.emit(
            "sendEmail",
            email,
            config,
            parseDate(date, "YYYY-MMM-DD hh:mm:ss A")
        );
    };

    const parseDate = (date, format) => {
        return dayjs(date).format(format);
    };

    return (
        <div>

            <title>LNVPN - Get a pay as you use VPN tunnel</title>
            <h1>LN VPN</h1>
            <Container className="main-middle">
                <Row>
                    <Col>
                        <Component.HeaderInfo
                            headline="Select a country ➞ Select duration ➞ Pay with Lightning ➞ Use your VPN ✔"
                            paragraph={
                                <>
                                    You need the{" "}
                                    <a
                                        href="https://www.wireguard.com/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Wireguard
                                    </a>{" "}
                                    VPN client app. You can download it{" "}
                                    <a
                                        href="https://www.wireguard.com/install/"
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        here
                                    </a>
                                    .
                                </>
                            }
                        />
                        <div id="key-input">
                            <KeyInput
                                onClick={() => displayNewPair(wireguard.generateKeypair)}
                                publicKey={keyPair.publicKey}
                                privateKey={keyPair.privateKey}
                                presharedKey={keyPair.presharedKey}
                                newPrivateKey={(privateKey) => {
                                    keyPair.privateKey = privateKey;
                                }}
                                newPublicKey={(publicKey) => {
                                    keyPair.publicKey = publicKey;
                                }}
                                newPresharedKey={(presharedKey) => {
                                    keyPair.presharedKey = presharedKey;
                                }}
                            />
                        </div>
                        <Component.CountrySelector
                            onChange={countrySelect}
                            countries={vpnendpoints}
                        />
                        <Component.RuntimeSelector onChange={runtimeSelect} />

                        <Component.AlertModal
                            show={alertModalparams.show}
                            text={alertModalparams.text}
                            variant={alertModalparams.type}
                            handleClose={hideAlertModal}
                        />

                        <Component.InvoiceModal
                            show={visibleInvoiceModal}
                            showSpinner={showSpinner}
                            isConfigModal={isConfigModal}
                            value={payment_request}
                            download={() => {
                                download(
                                    `lnvpn-${parseDate(getTimeStamp(priceDollar), "MM-DD")}.conf`,
                                    payment_request
                                );
                            }}
                            showNewInvoice={() => {
                                getInvoice(priceDollar);
                                setSpinner(true);
                            }}
                            handleClose={closeInvoiceModal}
                            emailAddress={emailAddress}
                            expiryDate={getTimeStamp(priceDollar)}
                            sendEmail={(data) =>
                                sendEmail(data, payment_request, getTimeStamp(priceDollar))
                            }
                            showPaymentAlert={showPaymentSuccessfull}
                        />
                        <Component.Price usd={true} value={priceDollar} />
                        <div className="main-buttons">
                            <Button
                                onClick={() => {
                                    getInvoice(priceDollar);
                                    renderAlert(false);
                                    // showInvoiceModal();
                                    hideConfigModal();
                                    updatePaymentrequest();
                                    setSpinner(true);
                                    isPaid = false;
                                }}
                                variant="success"
                                size="lg"
                            >
                                Pay with Lightning
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Component.Footer />
            </Container>
        </div>
    );
}

export default Home;
