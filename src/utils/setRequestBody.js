export async function setRequestBody(req) {
	const buffers = []

	for await (const chunk of req) {
		buffers.push(chunk)
	}
	
	try {
		return JSON.parse(Buffer.concat(buffers).toString())
	} catch {
		return null
	}
}