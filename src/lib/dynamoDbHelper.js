'use strict'
const AWS = require('aws-sdk')
const client = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' })
// const uuidV4 = require('uuid/v4')
const env = process.env

export const putTwiqqs = async (inData) => {
  const params = {
    TableName: env.messageTable,
    Item: {
      topic: inData.topic,
      messageId: `${inData.username}#${new Date().toISOString()}`,
      message: inData.message
    }
  }
  return await putItem(params);
}

export const getLatestTwiqqs = async (inData) => {
  const params = {
    TableName: env.messageTable,
    KeyConditionExpression: 'topic = :t',
    ExpressionAttributeValues: {
      ':t': inData.topic
    }
  }
  console.log({ message: 'Reading from dynamodb', params: params })
  const response = await client.query(params).promise()
  return response
}

export const topicExists = async (topic) => {
  const params = {
    TableName: env.topicTable,
    Key: { topic }
  }
  console.log({ message: 'Reading from dynamodb', params: params })
  const response = await client.get(params).promise()
  return !!Object.keys(response).length
}

export const putTopic = async (topic) => {
  const params = {
    TableName: env.topicTable,
    Item: {
      topic: topic
    }
  }
  return await putItem(params);
}

export const putConnection = async (connectionId, email) => {
  const timeToLive = Math.round(Date.now() / 1000) + (3600 * 6); // 6 hours forward in seconds
  const params = {
    TableName: env.connectionsTable,
    Item: {
      connectionId,
      email,
      timeToLive
    }
  }
  return await putItem(params);
}

export const putItem = async (params) => {
  console.log({ message: 'Writing to dynamodb', params: params })
  return await client.put(params).promise();
}