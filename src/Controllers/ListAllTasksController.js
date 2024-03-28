import ListAllTasksService from "./Services/ListAllTasksService.js";

class ListAllTasksController {
	async execute(req, res) {
		const resultService = await ListAllTasksService.execute()

		return res.writeHead(200).end(JSON.stringify({
			success: true,
			message: resultService
		}))
	}
}

export default new ListAllTasksController()