import http from 'node:http'
import { handleRequest } from './utils/handleRequest.js'

const server = http.createServer(async (req, res) => {
	await handleRequest(req, res)
})

server.listen(3333)
console.log('Server running on port 3333')