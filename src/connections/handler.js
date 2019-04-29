'use strict'
import { resp } from '../lib/responses'

const dynamoHelper = require('../lib/dynamoDbHelper')

export const get = async () => {
  const connections = await dynamoHelper.getAllConnections();
  const emails = connections.map((con) => { return con.email});
  try {
    return resp(200, JSON.stringify(emails))
  } catch (error) {
    console.log(error)
    return resp(500, error.message)
  }
}
