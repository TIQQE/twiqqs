export const resp = (statusCode, json) => {
  return {
    statusCode: parseInt(statusCode),
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify(json)
  }
}
