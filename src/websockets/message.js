import { resp } from "../lib/responses";

export const postMessage = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const topic = body.topic;
    const message = body.message;
    console.log(`topic: ${topic}`);
    console.log(`message: ${message}`);
    return resp(200, '');
  } catch (error) {
    return resp(200, '');
  }
}