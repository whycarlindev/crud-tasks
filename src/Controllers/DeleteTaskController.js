import DeleteTaskService from "./Services/DeleteTaskService.js"

class DeleteTaskController {
	async execute(req, res) {
		const valueUrlParam = req.valueUrlParam
		const resultService = await DeleteTaskService.execute(valueUrlParam)

		if (!resultService) {
			return res.writeHead(404).end(JSON.stringify({
				success: false,
				message: 'Task id not found'	
			}))
		}
	
		return res.writeHead(200).end(JSON.stringify({
			success: true,
			message: 'Task Deleted successfully'
		}))
	}
}

export default new DeleteTaskController()