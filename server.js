const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

// Create an instance of express
const app = express();
// Port to listen
const port = 8000;

const projectData = [];
const api_key = '&appid=8af4c366f1c0b26030723b7ade444db9';
const url =
  'https://api.openweathermap.org/data/2.5/weather?q=abuja,900109,234';

app.use(cors());
// Function to fetch data from open weather api

const getApiData = async (url, key) => {
  const response = await fetch(`${url} ${key}`);
  try {
    const data = await response.json();
    projectData.push(data);
  } catch (e) {
    console.log('Error', e.message);
  }
};
getApiData(url, api_key);

// Setup cors

// App middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect frontend to backend
app.use(express.static('website'));

// GET Route
app.get('/projectData', async (req, res) => {
  const data = await fetchDataFromAppEndPoint();
  res.send(data);
});
// Async func to fetch data from the app end point
const fetchDataFromAppEndPoint = async () => {
  return await projectData;
};

// POST Route to add data to the app endpoint

app.post('/projectData', (req, res) => {
  const { zip, feelings } = req.body;
  console.log(zip, feelings, 'details');
  // Validate data
  if (zip === '' || feelings === '') {
    res.send('Please provide a complete information');
  } else {
    const data = {
      zip: zip,
      feelings: feelings,
    };
    projectData.push(data);
    res.send(projectData);
  }
});

// Lister to port
app.listen(port, () => {
  console.log(`Server running port ${port}`);
});
