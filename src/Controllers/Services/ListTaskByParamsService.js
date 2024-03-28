import fs from 'node:fs/promises'

class ListTaskByParamsService {
	async execute(valueQueryParameter) {
		const allTasks = await fs.readFile('./database/tasks/data.json', 'utf8')
		const dataBaseData = allTasks ? JSON.parse(allTasks) : []
    const { title, description } = valueQueryParameter
		const taskFoundById = dataBaseData.find((task) => {
      if (title && description) {
        return task.title === title && task.description === decodeURIComponent(description)
      }

      return task.title === title || task.description === decodeURIComponent(description)
    })

    if (!taskFoundById) {
      return false
    }

		return taskFoundById
	}
}

export default new ListTaskByParamsService()