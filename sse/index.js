const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

app.get('/sse', (req, res) => {
  res.set({
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive'
  });

  res.flushHeaders();

  setInterval(() => {
    const data = {
      message: `User Added`
    };

    res.write(JSON.stringify(data));
  }, 1000);
});
