'use strict'

const dynamoHelper = require('../lib/dynamoDbHelper')

exports.get = async (event) => {
  try {
    const topic = event.pathParameters.topic
    const response = await dynamoHelper.getLatestTwiqqs({ topic })
    return {
      statusCode: 200,
      body: JSON.stringify(response)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message || error)
    }
  }
}
