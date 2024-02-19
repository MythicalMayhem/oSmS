let currentConvo

function getCookie(cName) {
    const name = cName + "=";
    const cDecoded = decodeURIComponent(document.cookie);
    const cArr = cDecoded.split('; ');
    let res;
    cArr.forEach(val => {
        if (val.indexOf(name) === 0) res = val.substring(name.length);
    })
    return res;
}

async function getConvoDeets(id) {
    return fetch("../backend/convoDetails.php", {
        "method": "POST",
        "headers": { "Content-Type": "application/json;charset=utf-8" },
        "body": JSON.stringify({ "id": id })
    })
        .then((res) => { return res.json() })
        .then((params) => { return params })
}
async function getUserDeets(id) {
    return fetch("../backend/userDetails.php", {
        "method": "POST",
        "headers": { "Content-Type": "application/json;charset=utf-8" },
        "body": JSON.stringify({ "id": id })
    })
        .then((res) => { return res.json() })
        .then((params) => {
            return params
        })
}

async function populateConvos(data) {
    let arr = data.split(',')
    let container = document.getElementById('heads')
    while (container.firstChild) { container.removeChild(container.lastChild); }
    let currentUser = getCookie('userid')
    for (let i = 1; i < arr.length; i++) {
        let RES0 = await getConvoDeets(arr[i])

        let breaker = document.createElement('br')
        let button = document.createElement('button')
        button.className = 'name'
        button.id = arr[i]
        if (RES0['content']['name'].split('and')[0].trim() == currentUser) {
            button.innerText = RES0['content']['name'].split('and')[1].trim()
        } else {
            button.innerText = RES0['content']['name'].split('and')[0].trim()
        }
        button.addEventListener('click', loadConvoHistory)
        container.appendChild(button)
        container.appendChild(breaker)
    }
}


function newMsg(content) {
    let container = document.querySelector('.history')
    let date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    let div = document.createElement('div')
    div.className = 'sent'
    div.innerText = content
    let p = document.createElement('p')
    p.innerText = `${day}-${month}-${year}`;
    p.className = 'date'
    container.appendChild(p)
    container.appendChild(div)
}

async function populateHistory(params) {
    let userid = getCookie('userid')
    let receip

    if (currentConvo.split('x')[0] == userid) { receip = currentConvo.split('x')[0] } else { receip = currentConvo.split('x')[1] }
    let res2 = await getUserDeets(receip)
    document.querySelector('.receip').innerText = res2['content']['username']
    let container = document.querySelector('.history')
    while (container.firstChild) { container.removeChild(container.lastChild) }
    for (let i = params['content'].length - 1; -1 < i; i--) {
        let div = document.createElement('div')
        let p = document.createElement('p')
        if (params['content'][i]['userid'] == userid) { div.className = 'sent' } else { div.className = 'received' }
        div.innerText = params['content'][i]['content']
        p.innerText = params['content'][i]['sentdate']
        p.className = 'date'
        container.appendChild(p)
        container.appendChild(div)
    }
}

async function loadConvoHistory(that) {
    let temp = that.srcElement.id
    let content = { "id": temp }
    return fetch("../backend/getHistory.php", {
        "method": "POST",
        "headers": { "Content-Type": "application/json;charset=utf-8" },
        "body": JSON.stringify(content)
    })
        .then((res) => { return res.json() })
        .then((params) => {
            currentConvo = that.srcElement.id
            populateHistory(params)
        })
}

async function loadConvos() {
    let content = { "id": getCookie('userid') }
    return fetch("../backend/getConvos.php", {
        "method": "POST",
        "headers": { "Content-Type": "application/json;charset=utf-8" },
        "body": JSON.stringify(content)
    })
        .then((res) => { return (res.json()) })
        .then((params) => { populateConvos(params['content']) })
}

async function sendMsg() {
    let sendr = getCookie('userid')
    if (sendr?.length < 1) { return alert('token expired login again') }
    let msg = document.getElementById('area').value
    if (msg.trim().length == 0) { return }
    let content = { "userid": sendr, "id": ('history' + currentConvo).trim(), "content": msg }

    fetch("../backend/sendMessage.php", {
        "method": "POST",
        "headers": { "Content-Type": "application/json;charset=utf-8" },
        "body": JSON.stringify(content)
    })
        .then(function (res) { return (res.json()) })
        .then(function (params) {
            if (params['code'] != 204) { return alert(params['comment']) }
            newMsg(msg)

        })
}

async function addConvo() {
    let receip = document.getElementById('addid').value
    let sendr = getCookie('userid')
    //    console.log(document.cookie)
    if (sendr?.length < 1) { return alert('token expired login again') }
    let content = { "fid": receip, "client": sendr }

    fetch("../backend/addConvo.php", {
        "method": "POST",
        "headers": { "Content-Type": "application/json;charset=utf-8" },
        "body": JSON.stringify(content)
    })
        .then(function (res) { return (res.json()) })
        .then(function (params) {
            if (params['code'] != 202) { alert(params['comment']) }
            loadConvos()
        })
}
document.getElementById('add').addEventListener('click', addConvo)
document.getElementById('send').addEventListener('click', sendMsg)

loadConvos()