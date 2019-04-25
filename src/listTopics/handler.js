'use strict'
import { resp } from '../lib/responses'

export const list = async (event) => {
  try {
    const response = [ // sooo hardcoded it hurts
      {
        name: 'random'
      },
      {
        name: 'news'
      },
      {
        name: 'serverless'
      }
    ]
    return resp(200, JSON.stringify(response))
  } catch (error) {
    console.log(error)
    return resp(500, error.message)
  }
}
