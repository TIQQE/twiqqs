export const resp = (statusCode, str) => {
  const response = {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  if (str) {
    response.body = str
  }
  return response
}
