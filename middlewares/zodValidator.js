module.exports = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse(req.body);
    req.body = parsed;
    next();
  } catch (err) {
    return res.status(400).json({
      error: 'Validation failed',
      details: err.message,
    });
  }
};