// Server: local, jsonServer, and ngrok
const mode = 'main'

const config = {
    main: {
        baseURL: 'https://api-absensi.eventpro.id/api',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
        },
    },
    local: {
        baseURL: 'http://127.0.0.1:8000/api/',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Accept': 'application/json',
        },
    },
}

export default config[mode]
