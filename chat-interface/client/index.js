const socket = io();

const input = document.getElementById('txt-input');

document.querySelector('#snd-btn').addEventListener('click', sendText);
document.querySelector('#clr-btn').addEventListener('click', clearMessages);
document.querySelector('#next-btn').addEventListener('click', setUsername);

function setUsername() {
  let uname = document.querySelector('#uname').value;
  const displayBody = document.querySelector('.text-body');
  const clearBtn = document.querySelector('#clr-btn');
  const unameContainer = document.querySelector('.uname-container');
  unameContainer.style.display = 'none';

  if (!uname) uname = null;
  socket.emit('set-username', uname);

  displayBody.style.display = 'block';
  clearBtn.style.display = 'block';
}

function sendText() {
  const text = input.value;
  input.value = '';

  if (text) {
    socket.emit('chat-message', text);
  }
}

function clearMessages() {
  document.querySelectorAll('li').forEach(el => {
    document.querySelector('#txt-list').removeChild(el);
  });
}

socket.on('chat-message', (message) => {
  const txtList = document.getElementById('txt-list');
  const li = document.createElement('li');

  const usernameCtn = document.createElement('p');
  usernameCtn.textContent = message.username ? message.username : 'User';
  usernameCtn.classList.add('u_name');
  li.appendChild(usernameCtn);

  const textCtn = document.createElement('p');

  textCtn.textContent = message.text;
  textCtn.classList.add('u_text');
  li.appendChild(textCtn);
  li.classList.add('text');
  txtList.appendChild(li);
});

document.querySelector('')