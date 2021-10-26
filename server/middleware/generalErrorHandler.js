const generalErrorHandler = (err, req, res, next) => {
  res
    .status(500)
    .json({ error: 'Something went wrong, please try again later.' });
};

export default generalErrorHandler;
