'use strict'
import { resp } from '../lib/responses'

const dynamoHelper = require('../lib/dynamoDbHelper')

exports.get = async (event) => {
  try {
    const topic = event.pathParameters.topic
    const response = await dynamoHelper.getLatestTwiqqs({ topic })
    return resp(200, response)
  } catch (error) {
    return resp(500, error.message || error)
  }
}
