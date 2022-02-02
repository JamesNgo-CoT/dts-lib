function setResponse(response, code, content) {
  response.setStatusCode(code);

  if (typeof content === 'object') {
    content = JSON.stringify(content);
  }
  response.setContent(content);
}

module.exports = { setResponse };
