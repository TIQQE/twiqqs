'use strict'
import { resp } from '../lib/responses'

const dynamoHelper = require('../lib/dynamoDbHelper')

exports.post = async (event) => {
  console.log(JSON.stringify(event))
  const topic = JSON.parse(event.body).topic
  const message = JSON.parse(event.body).message
  const username = JSON.parse(event.body).user // will come from cognito

  try {
    const topicExists = await dynamoHelper.topicExists(topic)
    if (!topicExists) {
      dynamoHelper.putTopic(topic) // sync
    }
    await dynamoHelper.putTwiqqs({ message, username, topic })
    return resp(200, 'ok')
  } catch (error) {
    resp(500, error.message)
  }
}
