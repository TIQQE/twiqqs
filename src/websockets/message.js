import { resp } from "../lib/responses";
import { getConnection, putTwiqqs } from "../lib/dynamoDbHelper";

export const postMessage = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const topic = body.topic;
    const message = body.message;
    const connection = await getConnection(event.requestContext.connectionId);
    const email = connection.email;
    
    console.log(`topic: ${topic}`);
    console.log(`message: ${message}`);
    console.log(`email: ${email}`);

    await putTwiqqs(email, topic, message);
    return resp(200, '');
  } catch (error) {
    return resp(200, '');
  }
}