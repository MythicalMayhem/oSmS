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

async function getHistory(params) {
    let content = { "id": params }
    return fetch("../backend/getHistory.php", {
        "method": "POST",
        "headers": { "Content-Type": "application/json;charset=utf-8" },
        "body": JSON.stringify(content)
    }).then(function (res) { return res.json() })
}

async function getConvos() {
    log(10)
    let content = { "id": getCookie('userid') }
    return fetch("../backend/getHistory.php", {
        "method": "POST",
        "headers": { "Content-Type": "application/json;charset=utf-8" },
        "body": JSON.stringify(content)
    }).then(function (res) { return console.log(res.json()) })
}
function addConvo() {
    let receip = document.getElementById('addid').value
    let sendr = getCookie('userid')
    console.log(document.cookie)
    if (sendr.length < 1) { return alert('token expired login again') }

    let content = {
        "fid": receip,
        "client": sendr
    }
    fetch("../backend/addfriend.php", {
        "method": "POST",
        "headers": { "Content-Type": "application/json;charset=utf-8" },
        "body": JSON.stringify(content)
    }).then(function (res) { console.log(res); return (res.json()) })
        .then(function (params) {
            console.log(1)
            if (params != 202) { alert(params['comment']) }
            else { console.log(getHistory(params["content"])) }
        })
}
document.getElementById('add').addEventListener('click', addConvo)