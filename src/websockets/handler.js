'use strict'
import { resp } from '../lib/responses'
import { connect } from './connect';

export const handler = async (event) => {
  console.log(JSON.stringify(event));
  
  if(event.requestContext.eventType === 'CONNECT') {
    const accessToken = event.queryStringParameters && event.queryStringParameters.access_token;
    return await connect(accessToken)
  } else {
    console.log('Non-connect type invocation');
    return resp(200, '');
  }
}
