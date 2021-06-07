const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

// Create an instance of express
const app = express();
// Port to listen
const port = 8000;

const projectData = {};
const api_key = '&appid=8af4c366f1c0b26030723b7ade444db9&units=metric ';
const url =
  'https://api.openweathermap.org/data/2.5/weather?q=abuja,900109,234';

app.use(cors());

// Fetch data from Open weather map API and populate the Object
const getApiData = async (url, key) => {
  await fetch(`${url}${key}`)
    .then((response) => response.json())
    .then((data) => {
      projectData['temp'] = data.main.temp;
      projectData['name'] = data.name;
    })
    .catch((error) => error);
};
getApiData(url, api_key);

// Setup cors

// App middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect frontend to backend
app.use(express.static('website'));

// GET Route
app.get('/all', async (req, res) => {
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
  // Validate data
  if (zip === '' || feelings === '') {
    res.send('Please provide a complete information');
  } else {
    const data = {
      zip: zip,
      feelings: feelings,
    };
    projectData['zip'] = data.zip;
    projectData['feelings'] = data.feelings;
    res.send(projectData);
    console.log(projectData);
  }
});

// Lister to port
app.listen(port, () => {
  console.log(`Server running port ${port}`);
});
