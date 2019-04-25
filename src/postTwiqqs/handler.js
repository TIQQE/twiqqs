'use strict'
import { resp } from '../lib/responses'

const dynamoHelper = require('../lib/dynamoDbHelper')

export const post = async (event) => {
  console.log(JSON.stringify(event))
  const topic = JSON.parse(event.body).topic
  const message = JSON.parse(event.body).message
  const username = JSON.parse(event.body).user // will come from cognito

  try {
    const topicExists = await dynamoHelper.topicExists(topic)
    if (!topicExists) {
      dynamoHelper.putTopic(topic) // sync
    }
    await dynamoHelper.putTwiqqs(username, topic, message)
    return resp(200, 'ok')
  } catch (error) {
    resp(500, error.message)
  }
}
