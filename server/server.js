import app from './index.js';

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
