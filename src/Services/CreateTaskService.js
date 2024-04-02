import { randomUUID } from 'node:crypto';
import { getActualDate } from '../utils/getDate.js';
import fs from 'node:fs/promises'

class CreateTaskService {
	async execute(body) {
		const allTasks = await fs.readFile('./database/tasks/data.json', 'utf8')
		const dataBaseData = allTasks ? JSON.parse(allTasks) : []
		const taskAlreadyExist = dataBaseData.find((task) => task.title === body.title)
	
		if (taskAlreadyExist) {
			return false
		}

		const task = {
			id: randomUUID(),
			title: body.title,
			description: body.description,
			completed_at: null,
			created_at: getActualDate(),
			updated_at: null
		}

		dataBaseData.push(task)
		
		await fs.writeFile('./database/tasks/data.json', JSON.stringify(dataBaseData), 'utf8')

		return true
	}
}

export default new CreateTaskService()