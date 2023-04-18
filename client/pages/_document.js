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