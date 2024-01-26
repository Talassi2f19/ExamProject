const obj = {
    mID: document.querySelector('#my-id'),
    fID: document.querySelector('#f-id'),
    conBtn: document.querySelector('#conn'),
    msg: document.querySelector('#msg'),
    send: document.querySelector('#send'),
    Cdisplay: document.querySelector('main')
};

var peer = new Peer();
var Aconn = undefined;

peer.on('open', (id) => {
    obj.mID.value = id;
  });

peer.on('connection', (NAConn) => {
    if(Aconn != undefined) Aconn.close();
    obj.fID.value = NAConn.peer;
    Aconn = NAConn;
    Aconn.on("data", displayFriendMsg);
});

obj.conBtn.addEventListener("click", () => {
    if(obj.fID.value.length > 0){
        if(Aconn != undefined) Aconn.close();
        Aconn = peer.connect(obj.fID.value);
        Aconn.on("data", displayFriendMsg)
    }
});
obj.send.addEventListener("click", () => {
    if(Aconn != undefined){
        if(obj.msg.value.length > 0){
            sendData(obj.msg.value);
            displayMyMsg();
            obj.msg.value = "";
        }
    }
    
});

function displayMyMsg(){
    obj.Cdisplay.insertAdjacentHTML("beforeend", `
    <div class="my-msg">
        <div>
            <div class="title">${obj.mID.value}</div>
            <div class="content-msg">${obj.msg.value}</div>
        </div>
    </div>
    `)
}
function displayFriendMsg(data){
    obj.Cdisplay.insertAdjacentHTML("beforeend", `
    <div class="friend-msg">
        <div>
            <div class="title">${obj.fID.value}</div>
            <div class="content-msg">${data}</div>
        </div>
    </div>`
    )
}

function sendData(data){
    if(Aconn != undefined){
        Aconn.send(data);
    }
}