'use strict'
import { resp } from '../lib/responses'

export const createTopic = async (event) => {
  console.log(JSON.stringify(event))
  try {
    return resp(200, JSON.stringify('Hello world!'))
  } catch (error) {
    console.log(error)
    return resp(500, error.message)
  }
}
