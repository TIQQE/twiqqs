'use strict'

import { connect } from './connect.js';
import { disconnect } from './disconnect.js';
import { postMessage } from './message.js';

export const handler = async (event) => {
  console.log(JSON.stringify(event));
  
  if(event.requestContext.eventType === 'CONNECT') {
    const accessToken = event.queryStringParameters && event.queryStringParameters.access_token;
    return await connect(accessToken, event.requestContext.connectionId);
  } else if (event.requestContext.eventType === 'DISCONNECT') {
    return await disconnect(event.requestContext.connectionId);
  } else {
    return await postMessage(event);
  }
}
