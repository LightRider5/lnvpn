// next.config.js
module.exports = {
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: '/invoicehook',
                destination: 'http://localhost:5000/invoicehook',
            },
            {
                source: '/api/v1/:path*',
                destination: 'http://localhost:5000/api/v1/:path*/',
            },
            {
                source: '/api/documentation',
                destination: 'http://localhost:5000/api/documentation/',
            },
        ];
    },
};
