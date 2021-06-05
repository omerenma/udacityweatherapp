// const fetch = require('node-fetch');
const api_key = '&appid=8af4c366f1c0b26030723b7ade444db9';
const url =
  'https://api.openweathermap.org/data/2.5/weather?q=abuja,900109,234';
const serverUrl = 'http://localhost:8000/projectData';
const generate = document.getElementById('generate');

const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

// Function to fetch data from open weather api

const getApiData = (url) => {
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      date.innerHTML = data[0].dt;
      temp.innerHTML = data[0]['main'].temp;
      content.innerHTML = data[0].name;
    })
    .catch((error) => error);
};

generate.addEventListener('click', (e) => {
  e.preventDefault();
  const formData = {
    zip: document.getElementById('zip').value,
    feelings: document.getElementById('feelings').value,
  };
  getApiData(serverUrl);
  postDataToServer(serverUrl, formData);
});

// Async function to make a POST to server

const postDataToServer = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  try {
    const res = await response.json();
    console.log(res);
    return res;
  } catch (error) {
    return error;
  }
};
