function notFound(req, res) {
  res.status(404).json({
    status: 404,
    error: 'Not Found',
    message: 'Route not found'
  });
}

module.exports = notFound;
