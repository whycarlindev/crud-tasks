import fs from 'node:fs/promises'

class DeleteTaskService {
	async execute(valueUrlParam) {
		const allTasks = await fs.readFile('./database/tasks/data.json', 'utf8')
		const dataBaseData = allTasks ? JSON.parse(allTasks) : []
		const taskFoundById = dataBaseData.find((task) => task.id === valueUrlParam)

		if (!taskFoundById) {
			return false
		}

		dataBaseData.map((task, index) => {
			if (task.id === valueUrlParam) {
				dataBaseData.splice(index, 1)
				return
			}
		})

		await fs.writeFile('./database/tasks/data.json', JSON.stringify(dataBaseData), 'utf8')

		return true
	}
}

export default new DeleteTaskService()