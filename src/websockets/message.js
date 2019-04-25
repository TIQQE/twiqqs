import { resp } from '../lib/responses'
import { getConnection, putTwiqqs, getAllConnections } from '../lib/dynamoDbHelper'

const util = require('util')
const AWS = require('aws-sdk')

export const postMessage = async (event) => {
  try {
    const body = JSON.parse(event.body.replace(/\n/g, '<br>'))
    const topic = body.topic
    const message = body.message
    const connection = await getConnection(event.requestContext.connectionId)
    const email = connection.email

    console.log(`topic: ${topic}`)
    console.log(`message: ${message}`)
    console.log(`email: ${email}`)

    const messageItem = await putTwiqqs(email, topic, message)

    console.log('Pushing message to all open connections...')
    await pushMessageToOpenConnections(messageItem, event)
    console.log('Success!')
    return resp(200)
  } catch (error) {
    return resp(200)
  }
}

export const pushMessageToOpenConnections = async (messageItem, event) => {
  const domain = event.requestContext.domainName
  const stage = event.requestContext.stage
  const callbackUrlForAWS = util.format(util.format('https://%s/%s', domain, stage))

  const connections = await getAllConnections()

  const promises = []

  for (const connection of connections) {
    const connectionId = connection.connectionId
    promises.push(sendMessageToClient(callbackUrlForAWS, connectionId, messageItem))
  }

  return Promise.all(promises)
}

export const sendMessageToClient = async (url, connectionId, payload) => {
  const apiGw = new AWS.ApiGatewayManagementApi({ apiVersion: '2029', endpoint: url })
  return apiGw.postToConnection({
    ConnectionId: connectionId,
    Data: JSON.stringify(payload)
  }).promise()
}
