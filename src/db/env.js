const env = process.env.NODE_ENV || 'development'
const ip = require('ip')

const port = process.env.PORT || 3001, 
    myIP =ip.address()

let baseUrl = `http://${myIP}:${port}`


module.exports = {
    host: process.env.HOST || "0.0.0.0",
    port,
    baseUrl,
    env,
    isProd : env === 'production',
}