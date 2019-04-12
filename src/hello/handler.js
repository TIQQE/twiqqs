'use strict'

exports.hello = async (event) => {
  console.log(JSON.stringify(event))
  const response = [{ message: 'Twiqqs1' }, { message: 'Twiqqs2' }, { message: 'Twiqqs3' }]

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}
