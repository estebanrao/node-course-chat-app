const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', message => {
    console.log('New message', message);
    const li = document.createElement('li');
    li.textContent = `${message.from}: ${message.text}`;
    document.getElementById('messages').appendChild(li);
});

document.getElementById('js-message-form').addEventListener('submit', e => {
    e.preventDefault();

    socket.emit(
        'createMessage',
        {
            from: 'User',
            text: document.getElementsByName('message')[0].value,
        },
        () => {}
    );

    document.getElementsByName('message')[0].value = '';
});
