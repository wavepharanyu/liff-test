const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config();

const LINE_BOT_API_URL = 'https://api.line.me/v2/bot';

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${process.env.LINE_CHANNEL_ACCESS_TOKEN}`
};

app.post('/send-message', async (req, res) => {
  try {
    const { userId, message } = req.body;
    const body = {
      to: userId,
      messages: [
        {
          type: 'text',
          text: message
        }
      ]
    };
    const response = await axios.post(`${LINE_BOT_API_URL}/message/push`, body, { headers });
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(8888, () => {
  console.log('Server is running on port 8888');
});