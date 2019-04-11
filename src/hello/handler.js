'use strict'

exports.hello = async (event) => {
  const response = { message: 'Twiqqs' }

  return {
    statusCode: 200,
    body: JSON.stringify(response)
  }
}
