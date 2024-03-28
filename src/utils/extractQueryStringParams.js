export async function extractQueryStringParams(endPointRequest) {
  const queryStringParams = endPointRequest.split('?')[1]
  const chars = []

  for (let i = 0; i < queryStringParams.length; i++) {
    chars.push(queryStringParams[i])

    if (queryStringParams[i] === '=') {
      chars.splice(i, 1)
      chars.push(':')
      
      continue
    }

    if (queryStringParams[i] === '&') {
      chars.splice(i, 1)
      chars.push(' ')
      
      continue
    }
  }

  const string = chars.join('')
  const arraySplitedByWhiteSpace = string.split(' ')

  const objToReturn = arraySplitedByWhiteSpace.reduce((acc, curr) => {
    const [key, value] = curr.split(':')

    acc[key] = value

    return acc
  }, {})

  return objToReturn
}