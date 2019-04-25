import { resp } from '../lib/responses'
import { putConnection } from '../lib/dynamoDbHelper'
const rp = require('request-promise-native')

export const connect = async (accessToken, connectionId) => {
  if (!accessToken) return deny()
  const userInfoEndpoint = 'https://twiqqs-test.auth.eu-west-1.amazoncognito.com/oauth2/userInfo'
  const requestOptions = {
    url: userInfoEndpoint,
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    json: true
  }

  try {
    const userInfo = await rp(requestOptions)
    console.log(JSON.stringify(userInfo))

    await putConnection(connectionId, userInfo.email)
    return resp(200)
  } catch (error) {
    console.error(error)
    return deny()
  }
}

export const deny = () => {
  return resp(401)
}
