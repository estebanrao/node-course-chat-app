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

socket.on('newLocationMessage', message => {
    const messages = document.getElementById('messages');
    const li = document.createElement('li');
    const a = document.createElement('a');
    li.textContent = `${message.from}: `;
    a.textContent = 'My current location';
    a.setAttribute('target', '_blank');
    a.setAttribute('href', message.url);
    li.appendChild(a);
    messages.appendChild(li);
});

const messageForm = document.getElementById('js-message-form');
messageForm.addEventListener('submit', e => {
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

const locationButton = document.getElementById('js-send-location');
locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser!');
    }

    navigator.geolocation.getCurrentPosition(
        position => {
            console.log(position);
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
        },
        () => {
            alert('Unable to fetch location!');
        }
    );
});
