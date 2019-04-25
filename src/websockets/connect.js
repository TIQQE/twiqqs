import { resp } from "../lib/responses";
import * as rp from 'request-promise-native';

export const connect = async (accessToken) => {
  if(!accessToken) return deny();
  const userInfoEndpoint = 'https://twiqqs-test.auth.eu-west-1.amazoncognito.com/oauth2/userInfo';
  const requestOptions = {
    url: userInfoEndpoint,
    headers: {
      Authorization: `Bearer ${accessToken}`
    },
    json: true
  };

  try {
    const userInfo = await rp(requestOptions);
    console.log('userInfo: ');
    console.log(JSON.stringify(userInfo));

    await createConnection();
    return resp(200, '');
  } catch(error) {
    console.error(error);
    return deny();
  }
}

export const deny = () => {
  return resp(401, '');
}

export const createConnection = async () => {
  return;
}