'use strict'

import { connect } from './connect.js'
import { disconnect } from './disconnect.js'
import { postMessage } from './message.js'
import { resp } from '../lib/responses.js'

export const handler = async (event) => {
  console.log(JSON.stringify(event))

  if (event.requestContext.eventType === 'CONNECT') {
    const accessToken = event.queryStringParameters && event.queryStringParameters.access_token
    return connect(accessToken, event.requestContext.connectionId)
  } else if (event.requestContext.eventType === 'DISCONNECT') {
    return disconnect(event.requestContext.connectionId)
  } else if (event.requestContext.eventType === 'MESSAGE') {
    return postMessage(event)
  } else {
    console.warn('No handling for this event type')
    resp(200)
  }
}
