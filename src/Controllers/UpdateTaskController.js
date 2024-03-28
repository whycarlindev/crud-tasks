import UpdateTaskService from "./Services/UpdateTaskService.js";

class UpdateTaskController {
	async execute(req, res) {
		const body = req.body
		const valueUrlParam = req.valueUrlParam

		if (!body.title || !body.description || !valueUrlParam) {
			return res.writeHead(400).end(JSON.stringify({
				success: false,
				message: 'Invalid request parameters'
			}))
		}
	
		const resultService = await UpdateTaskService.execute(body, valueUrlParam)

		if (!resultService) {
			return res.writeHead(404).end(JSON.stringify({
				success: false,
				message: 'Task id not found'	
			}))
		}
	
		return res.writeHead(200).end(JSON.stringify({
			success: true,
			message: 'Task Updated'
		}))
	}
}

export default new UpdateTaskController()