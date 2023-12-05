import React from 'react'
import { Container } from 'react-bootstrap'
import Image from 'next/image';
import Link from 'next/link';




const esim = () => {
    return (
        <div className='esim-site'>
            <Container>
                <h4>
                    If you need an eSIM with a permanent anonymous phone number or data volume, check out <Link href="https://silent.link/lnvpn" target="_blank">silent.link</Link>.
                </h4>
                <Link href="https://silent.link/lnvpn" target="_blank">
                    <Image src="/media/silent-link-logo.svg" alt="Silent Link Logo" width={200} height={200} />
                </Link>
            </Container>
        </div>
    )
}

export default esim
