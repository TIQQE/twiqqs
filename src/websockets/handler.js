'use strict'
import { resp } from '../lib/responses'
import { connect } from './connect.js';

export const handler = async (event) => {
  console.log(JSON.stringify(event));
  
  if(event.requestContext.eventType === 'CONNECT') {
    const accessToken = event.queryStringParameters && event.queryStringParameters.access_token;
    return await connect(accessToken, event.requestContext.connectionId);
  } else if (event.requestContext.eventType === 'DISCONNECT') {
    return resp(200, '');
  } else {
    console.log('Non-connect type invocation');
    return resp(200, '');
  }
}
