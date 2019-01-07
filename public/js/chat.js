const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});

socket.on('newMessage', message => {
    const template = document.getElementById('js-message-template').innerHTML;
    const messages = document.getElementById('js-messages');
    const formatedTime = moment(message.createdAt).format('h:mm a');

    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formatedTime,
    });

    messages.insertAdjacentHTML('beforeend', html);

    //
    // const li = document.createElement('li');
    // li.textContent = `${message.from} ${formatedTime}: ${message.text}`;
    // document.getElementById('js-messages').appendChild(li);
});

socket.on('newLocationMessage', message => {
    const template = document.getElementById('js-location-message-template').innerHTML;
    const messages = document.getElementById('js-messages');
    const formatedTime = moment(message.createdAt).format('h:mm a');

    const html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        url: message.url,
        createdAt: formatedTime,
    });

    messages.insertAdjacentHTML('beforeend', html);

    // const formatedTime = moment(message.createdAt).format('h:mm a');
    // const messages = document.getElementById('js-messages');
    // const li = document.createElement('li');
    // const a = document.createElement('a');
    // li.textContent = `${message.from} ${formatedTime}: `;
    // a.textContent = 'My current location';
    // a.setAttribute('target', '_blank');
    // a.setAttribute('href', message.url);
    // li.appendChild(a);
    // messages.appendChild(li);
});

const messageForm = document.getElementById('js-message-form');
messageForm.addEventListener('submit', e => {
    const messageTextBox = document.getElementsByName('message')[0];

    e.preventDefault();

    socket.emit(
        'createMessage',
        {
            from: 'User',
            text: messageTextBox.value,
        },
        () => (messageTextBox.value = '')
    );
});

const locationButton = document.getElementById('js-send-location');
locationButton.addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser!');
    }

    locationButton.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition(
        position => {
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            });
            locationButton.removeAttribute('disabled');
        },
        () => {
            alert('Unable to fetch location!');
            locationButton.removeAttribute('disabled');
        }
    );
});
