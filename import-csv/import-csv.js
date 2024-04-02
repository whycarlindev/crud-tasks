import fs from 'node:fs'
import { parse } from 'csv-parse'

async function main() {
  const rows = []
  const bodyRequest = []

  const file = fs.createReadStream('tasks-to-create.csv')
  .pipe(parse({
    fromLine: 2,
    skipEmptyLines: true,
  }))

  for await (const row of file) {
    rows.push(row)
  }

  rows.forEach(row => {
    const [title, description] = row.toString().split(',')

    bodyRequest.push({
      title: title,
      description: description
    })
  })

  await makeRequest(bodyRequest)
}

async function makeRequest(bodyRequest) {
  for await (const body of bodyRequest) {
    await fetch('http://localhost:3333/tasks', {
      method: 'POST',
      body: JSON.stringify(body)
    })
    .then((response) => {
      if (response.status !== 200 && response.status !== 201) {
        console.log('Failed to create Task: ' + response.status + ' ' + response.statusText)
      } else {
        console.log('Task ' + body.title + ' created')
      }
    })
    .catch((error) => {
      console.log('Failed to create Task ' + body.title + ' ' + error)
    })
  }
}

main()