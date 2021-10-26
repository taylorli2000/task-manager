const notFoundHandler = (req, res) => {
  res.status(404).json({ error: 'This route does not exist' });
};

export default notFoundHandler;
