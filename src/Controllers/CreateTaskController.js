import CreateTaskService from "./Services/CreateTaskService.js";

class CreateTaskController {
	async execute(req, res) {
		const body = req.body

		if (!body.title || !body.description) {
			return res.writeHead(400).end(JSON.stringify({
				success: false,
				message: 'Invalid request parameters'
			}))
		}
	
		const resultService = await CreateTaskService.execute(body)
	
		if (!resultService) {
			return res.writeHead(409).end(JSON.stringify({
				success: false,
				message: 'Task name already exist'	
			}))
		}
	
		return res.writeHead(201).end(JSON.stringify({
			success: true,
			message: 'Task created'
		}))
	}
}

export default new CreateTaskController()