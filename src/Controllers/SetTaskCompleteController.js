import SetTaskCompleteService from "./Services/SetTaskCompleteService.js";

class SetTaskCompleteController {
	async execute(req, res) {
		const valueUrlParam = req.valueUrlParam

		if (!valueUrlParam) {
			return res.writeHead(400).end(JSON.stringify({
				success: false,
				message: 'Invalid request parameters'
			}))
		}
	
		const resultService = await SetTaskCompleteService.execute(valueUrlParam)

		if (!resultService) {
			return res.writeHead(404).end(JSON.stringify({
				success: false,
				message: 'Task id not found'	
			}))
		}
	
		return res.writeHead(200).end(JSON.stringify({
			success: true,
			message: 'Task marked as complete'
		}))
	}
}

export default new SetTaskCompleteController()