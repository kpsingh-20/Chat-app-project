const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");4


// get username and room from url

const {username, room} = Qs.parse(location.search,{
    ignoreQueryPrefix : true
})

//console.log(username, room);



const socket = io();
socket.emit('joinRoom', {username, room});

socket.on('message', message =>{
    console.log(message);

    outputMessage(message);


    // scroll down
    chatMessages.scrollTop = chatMessages.scrollHeight;


});

//message submit

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get msg text    
    const msg = e.target.elements.msg.value;

    // Emit message to server. 
    socket.emit('chatMessage', msg);

    e.target.elements.msg.value = ''; 
    e.target.elements.msg.focus();
});

function outputMessage(message){
    const div = document.createElement('div');

    div.classList.add('message');

    div.innerHTML = `<p class="meta">${message.username} <span> ${message.time}</span></p>
    <p class="text">
        ${message.msg}
    </p>`;

    chatMessages.appendChild(div);

}