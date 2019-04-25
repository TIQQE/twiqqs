import { resp } from "../lib/responses";
import { deleteConnection } from '../lib/dynamoDbHelper';

export const disconnect = async (connectionId) => {
  await deleteConnection(connectionId);
  return resp(200, '');
}