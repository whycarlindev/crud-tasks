import ListTaskByParamsService from "./Services/ListTaskByParamsService.js"

class ListTaskByParamsController {
	async execute(req, res) {
		const valueQueryParameter = req.queryStringParams
		const resultService = await ListTaskByParamsService.execute(valueQueryParameter)

		if (!resultService) {
			return res.writeHead(404).end(JSON.stringify({
				success: false,
				message: 'Task not found'	
			}))
		}
	
		return res.writeHead(200).end(JSON.stringify({
			success: true,
			message: resultService
		}))
	}
}

export default new ListTaskByParamsController()