'use strict'
import { resp } from '../lib/responses'

const dynamoHelper = require('../lib/dynamoDbHelper')

export const get = async () => {
  try {
    return resp(200, JSON.stringify(await dynamoHelper.getAllConnections()))
  } catch (error) {
    console.log(error)
    return resp(500, error.message)
  }
}
