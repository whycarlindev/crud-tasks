import http from 'node:http'
import { handleRequest } from './utils/handleRequest.js'

const server = http.createServer(async (req, res) => {
	await handleRequest(req, res)
})

console.log('Server running on port 3333')
server.listen(3333)