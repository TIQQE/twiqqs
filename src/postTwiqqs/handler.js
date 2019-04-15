'use strict'

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
    return {
      statusCode: 200,
      body: JSON.stringify(message)
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error.message || error)
    }
  }
}
