// const server = require('http').createServer();
// const socket = require('socket.io')('http://localhost:1111/dev', );
const readline = require('readline');
const process = require('process');
const axios = require('axios');
const { response } = require('express');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function chat() {
  fetch_request();
  // const message = create_message();

  // send_text(message);
}

console.log('Type your message below: (q to quit) \n');

const create_message = () => {
  rl.question('-> ', (message => {
    if (message == 'q') process.exit(0);
    else if (message.length == 0) return create_message();

    return message;
  }));
}

async function send_text(message) {
  // const response = await fetch('http://localhost:1111/dev/', {
  //   "method": "POST",
  //   "authorization": {"name": "dev", "pass": "12345"},
  //   "body": JSON.stringify(message)
  // });

  // const data = await response.json();

  console.log("Hello");
}

chat();

async function fetch_request() {
  try{
    const response = await axios.get('http://localhost:1111/dev/', {
      timeout: 5000
    });

    console.log(response.data);

  } catch(error) {
    if(axios.isAxiosError(error)) {
      if(error.code === 'ECONNABORTED' || error.code === "TIMEOUT") {
        console.error('Request timed out.');
        return;
      }
      console.error('Axios error:', error);
      return;
    }
    console.error('Unexpected error: ', error);
  }
}
