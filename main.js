const socket = io('http://165.232.189.79:3002');

let name1 = prompt("Enter your name to join !!");

if (name1 === null || name1 === undefined || name1 === "") {
    name1 = "newuser";
}
socket.emit('newUserJoined', name1);

function append(text, position) {
    let ele = document.createElement('div');
    ele.innerHTML = text;
    ele.classList.add('message');
    ele.classList.add(position);
    document.getElementById('mainDiv').appendChild(ele);
}

socket.on('userJoined', username => {
    let text = `${username} joined the chat`;
    append(text, 'middle');
})

document.getElementById('send').addEventListener('click', () => {
    let message = document.getElementById('inpt').value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    document.getElementById('inpt').value = "";
})

socket.on('receive', data => {
    let text = `${data.name} : ${data.message}`;
    append(text, 'left');
})

socket.on('left', username => {
    let text = `${username} left the chat`;
    append(text, "middle");
})