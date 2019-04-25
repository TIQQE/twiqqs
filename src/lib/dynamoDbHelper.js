'use strict'
const AWS = require('aws-sdk')
const client = new AWS.DynamoDB.DocumentClient({ region: 'eu-west-1' })
// const uuidV4 = require('uuid/v4')
const env = process.env

export const putTwiqqs = async (email, topic, message) => {
  const item = {
    topic: topic,
    messageId: `${email}#${new Date().toISOString()}`,
    message: message
  };

  const params = {
    TableName: env.messageTable,
    Item: item
  }

  await putItem(params);
  return item;
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

export const deleteConnection = async (connectionId) => {
  console.log(`Deleting connectionId ${connectionId}`);
  const params = {
    TableName: env.connectionsTable,
    Key: { connectionId }
  };
  return await client.delete(params).promise();
}

export const getConnection = async (connectionId) => {
  const params = {
    TableName: env.connectionsTable,
    Key: { connectionId }
  };
  const response = await client.get(params).promise();
  return response.Item;
}

export const getAllConnections = async () => {
  const table = env.connectionsTable;
  let result = [];
  let startKey = null;
  while (true) {
    let params = {
      TableName: table,
      Limit: 1000
    };
    if (startKey) {
      params.ExclusiveStartKey = startKey;
    }
    const scanResponse = await client.scan(params).promise();
    result = result.concat(scanResponse.Items);
    if (scanResponse.LastEvaluatedKey) {
      startKey = scanResponse.LastEvaluatedKey;
      await new Promise(resolve => setTimeout(resolve, 100)); // this means "wait 0.1 second"
    } else {
      return result;
    }
  }
}