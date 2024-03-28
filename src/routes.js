import CreateTaskController from "./Controllers/CreateTaskController.js"
import ListAllTasksController from "./Controllers/ListAllTasksController.js"
import UpdateTaskController from "./Controllers/UpdateTaskController.js"
import DeleteTaskController from "./Controllers/DeleteTaskController.js"
import SetTaskCompleteController from "./Controllers/SetTaskCompleteController.js"
import ListTaskByParamsController from "./Controllers/ListTaskByParamsController.js"

export const routes = [
	{
		endPoint: '/tasks',
		methodHttp: 'GET',
		controller: async (req, res) => {
			await ListAllTasksController.execute(null, res)
		}
	},
	{
		endPoint: '/tasks?',
		methodHttp: 'GET',
		controller: async (req, res) => {
			await ListTaskByParamsController.execute(req, res)
		}
	},
	{
		endPoint: '/tasks',
		methodHttp: 'POST',
		controller: async (req, res) => {
			await CreateTaskController.execute(req, res)
		}
	},
	{
		endPoint: '/tasks/:id',
		methodHttp: 'PUT',
		controller: async (req, res) => {
			await UpdateTaskController.execute(req, res)
		}
	},
	{
		endPoint: '/tasks/:id/complete',
		methodHttp: 'PATCH',
		controller: async (req, res) => {
			await SetTaskCompleteController.execute(req, res)
		}
	},
	{
		endPoint: '/tasks/:id',
		methodHttp: 'DELETE',
		controller: async (req, res) => {
			await DeleteTaskController.execute(req, res)
		}
	},
]