const errorLogger = (err, req, res, next) => {
  console.error(err.stack);
  return next(err);
};

export default errorLogger;
