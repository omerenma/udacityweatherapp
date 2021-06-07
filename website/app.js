// const fetch = require('node-fetch');
const api_key = '&appid=8af4c366f1c0b26030723b7ade444db9&units=metric ';
const url =
  'https://api.openweathermap.org/data/2.5/weather?q=abuja,900109,234';
const serverUrl = 'http://localhost:8000/projectData';
const server_get_url = 'http://localhost:8000/all';
const generate = document.getElementById('generate');

// const getApiData = async (url, key) => {
//     const response = await fetch(`${url} ${key}`);
//     try {
//       const data = await response.json();
//       projectData.push(data);
//     } catch (e) {
//       console.log('Error', e.message);
//     }
//   };
// getApiData(url, api_key);

const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

// Object containing Data to be sent to the app Endpoint
const formData = {
  zip: document.getElementById('zip').value,
  feelings: document.getElementById('feelings').value,
};

// Function to fetch data from app endpoint in the server AND Update the UI
const getApiData = async (url) => {
  const date = document.getElementById('date');
  const temp = document.getElementById('temp');
  const content = document.getElementById('content');
  // Convert date
  const d = new Date();
  const newDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();

  await fetch(`${url}`)
    .then((response) => response.json())
    .then((data) => {
      date.innerHTML = newDate;
      temp.innerHTML = data.temp;
      content.innerHTML = data.name;
    })
    .catch((error) => error);
};
// generate.addEventListener('click', (e) => {
//   e.preventDefault();
//   getApiData(url, api_key)
//     .then(() => {
//       postDataToServer(serverUrl, formData);
//     })
//     .then(() => console.log('Success!'));
// });
generate.addEventListener('click', (e) => {
  e.preventDefault();
  const formData = {
    zip: document.getElementById('zip').value,
    feelings: document.getElementById('feelings').value,
  };
  getApiData(server_get_url)
    .then(() => {
      postDataToServer(serverUrl, formData);
    })
    .then(() => console.log('Success!'));
});

// Async function to make a POST to server

const postDataToServer = async (url, data) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
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
