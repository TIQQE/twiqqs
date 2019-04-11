'use strict'

exports.hello = async (event) => {
  console.log(JSON.stringify(event))
  const response = { message: 'Twiqqs' }

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}
