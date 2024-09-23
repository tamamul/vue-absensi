// Server: local, jsonServer, and ngrok
const mode = 'main',
backendUrl = 'https://10c5-125-162-212-218.ngrok-free.app'

const config = {
    main: {
        baseURL: 'https://api-absensi.eventpro.id/api',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'accept': 'application/json',
        },
    },
    local: {
        baseURL: 'http://127.0.0.1:8000/api/',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'accept': 'application/json',
        },
    },
    jsonServer: {
        baseURL: 'http://localhost:3000/',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'accept': 'application/json',
        },
    },
    ngrok: {
        baseURL: `${backendUrl}/api/`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'ngrok-skip-browser-warning': 'true',
            'accept': 'application/json',
        },
    },
}

export default config[mode]
