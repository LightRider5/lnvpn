import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html>
            <Head>
                <meta charset="utf-8" />
                <link rel="icon" href="favicon.ico" />

                <meta name="theme-color" content="#000000" />
                <link rel="apple-touch-icon" href="favicon.ico" />
                <link rel="manifest" href="manifest.json" />
                <script src='jquery-3.6.0.min.js'></script>
                <script src='bootstrap.bundle.min.js'></script>


            </Head>

            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}