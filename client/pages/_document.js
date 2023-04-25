import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script'

export default function MyDocument() {
    return (
        <Html>
            <Head>
                <meta charSet="utf-8" />
                <link rel="shortcut icon" href="/favicon.ico" />
                <meta name="theme-color" content="#000000" />
                <link rel="apple-touch-icon" href="/favicon.ico" />
                <link rel="manifest" href="/manifest.json" />


                <meta httpEquiv="X-UA-Compatible" content="ie=edge" />

                <meta property="og:title" content="LNVPN - Bitcoin Lightning-powered Disposable Phone Numbers & VPN Services" />
                <meta property="og:description" content="Experience true online privacy with LNVPN's Bitcoin Lightning-powered disposable phone number and VPN services. Fast, anonymous, and secure - perfect for crypto enthusiasts." />
                <meta property="og:image" content="https://lnvpn.net/logo.png" />
                <meta property="og:url" content="https://lnvpn.net" />
                <meta property="og:type" content="website" />
                <meta property="og:site_name" content="LNVPN" />


                <meta name="twitter:card" content="https://lnvpn.net/logo-twitter.jpg" />
                <meta name="twitter:title" content="LNVPN - Bitcoin Lightning-powered Disposable Phone Numbers & VPN Services" />
                <meta name="twitter:description" content="Experience true online privacy with LNVPN's Bitcoin Lightning-powered disposable phone number and VPN services. Fast, anonymous, and secure." />
                <meta name="twitter:image" content="https://lnvpn.net/logo-twitter.jpg" />
                <meta name="twitter:site" content="@ln_vpn" />
                <meta name="twitter:creator" content="@ln_vpn" />



                <Script src='/jquery-3.6.0.min.js'></Script>
                <Script src='/bootstrap.bundle.min.js'></Script>


            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}