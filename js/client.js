const socket = io("https://chat-e-fy-io.onrender.com");

const form = document.getElementById('send-container');
const messageInput = document.getElementById('msginp');
const container = document.querySelector('.container');
var audio = new Audio('messenger.mp3');

const getName = () => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    return url.searchParams.get('username');
};


const initializeChat = async () => {
    const name = getName();

    if (name !== null && name !== undefined && name !== "") {
        socket.emit('new-user-joined', name);

        socket.on('user-joined', name => {
            append(`${name} joined the chat`, 'left');
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const message = messageInput.value;
            if (messageInput.value !== '') {
                append(`Me: ${message}`, 'right');
                socket.emit('send', message);
                messageInput.value = '';
            }
        });

        socket.on('receive', data => {
            append(`${data.name}: ${data.message}`, 'left');
        });

        socket.on('leave', name => {
            append(`${name} left the chat`, 'left');
        });
    } else {
        const currentUrl = window.location.origin;
        const url = currentUrl + "/home.html";
        window.location.href = url;
    }
};

initializeChat();

const append = (message, position) => {
    const element = document.createElement('div');
    element.innerText = message;
    element.classList.add('message');
    element.classList.add(position);
    container.append(element);
    if (position == 'left') {
        audio.play();
    }
    container.scrollTop = container.scrollHeight;
}