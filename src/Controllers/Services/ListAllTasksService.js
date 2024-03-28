import fs from 'node:fs/promises'

class ListTaskService {
	async execute() {
		const allTasks = await fs.readFile('./database/tasks/data.json', 'utf8')

		if (!allTasks) {
			return []
		}

		return JSON.parse(allTasks)
	}
}

export default new ListTaskService()