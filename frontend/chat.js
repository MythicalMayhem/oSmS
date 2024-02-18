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

function populateConvos(data) {
    let arr = data.split(',')
    let container = document.getElementById('heads')
    while (container.firstChild) { container.removeChild(container.lastChild); }

    for (let i = 1; i < arr.length; i++) {
        let breaker = document.createElement('br')
        let button = document.createElement('button')
        button.className = 'name'
        button.id = arr[i]
        button.innerText = arr[i]
        button.addEventListener('click',populateHistory)
        container.appendChild(button)
        container.appendChild(breaker)
    }
}
function populateHistory(that,ev) {
    console.log(that)
    let receip = that.srcElement.id
    document.querySelector('.receip').innerText = receip
}

async function loadConvoHistory(params) {
    let content = { "id": params }
    return fetch("../backend/getHistory.php", {
        "method": "POST",
        "headers": { "Content-Type": "application/json;charset=utf-8" },
        "body": JSON.stringify(content)
    })
        .then((res) => { return res.json() })
        .then((params) => { console.log((params)) })
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
function addConvo() {
    let receip = document.getElementById('addid').value
    let sendr = getCookie('userid')
    console.log(document.cookie)
    if (sendr.length < 1) { return alert('token expired login again') }
    let content = { "fid": receip, "client": sendr }

    fetch("../backend/addfriend.php", {
        "method": "POST",
        "headers": { "Content-Type": "application/json;charset=utf-8" },
        "body": JSON.stringify(content)
    })
        .then(function (res) { console.log(res); return (res.json()) })
        .then(function (params) {
            if (params != 202) { alert(params['comment']) }
            else { console.log((params["content"])) }
        })
}
document.getElementById('add').addEventListener('click', addConvo)

loadConvos()