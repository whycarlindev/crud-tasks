import { getActualDate } from '../../utils/getDate.js';
import fs from 'node:fs/promises'

class UpdateTaskService {
	async execute(body, valueUrlParam) {
		const allTasks = await fs.readFile('./database/tasks/data.json', 'utf8')
		const dataBaseData = allTasks ? JSON.parse(allTasks) : []
		const taskFoundById = dataBaseData.find((task) => task.id === valueUrlParam)

		if (!taskFoundById) {
			return false
		}

		taskFoundById.title = body.title
		taskFoundById.description = body.description
		taskFoundById.updated_at = getActualDate()

		dataBaseData.map((task) => {
			if (task.id === valueUrlParam) {
				task = taskFoundById
			}
		})

		await fs.writeFile('./database/tasks/data.json', JSON.stringify(dataBaseData), 'utf8')

		return true
	}
}

export default new UpdateTaskService()