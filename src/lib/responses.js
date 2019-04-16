export const resp = (statusCode, str) => {
  return {
    statusCode: statusCode,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: str
  }
}
