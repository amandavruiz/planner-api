function errorHandler(error, req, res, next) {
  const status = error.status || 500;
  const statusText = status >= 500 ? 'Internal Server Error' : 'Bad Request';

  res.status(status).json({
    status,
    error: status >= 500 ? 'Internal Server Error' : statusText,
    message: error.message || 'Unexpected error'
  });
}

module.exports = errorHandler;
