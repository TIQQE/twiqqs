'use strict'
import { resp } from '../../lib/responses'

export const connectHandler = async (event) => {
  console.log(JSON.stringify(event));
  if(event.queryStringParameters && event.queryStringParameters.id_token) {
    return resp(200, '');
  } else {
    return resp(401, '');
  }
}
