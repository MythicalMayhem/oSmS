document.cookie=''
function setCookie(cName, cValue, time) {
    let date = new Date();
    date.setTime(date.getTime() + (time * 1000));
    date = "expires=" + date.toUTCString()
    document.cookie = cName + "=" + cValue + "; " + date + "; path=/";
}

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

function deleteCookie(name) {
    setCookie(name, '', -1)
}

function login() {
    let username = document.getElementById('luid').value.trim()
    let pw = document.getElementById('lpw').value.trim()
    let content = { 'type': 'login', 'username': String(username), 'pw': String(pw) }

    fetch("../backend/auth.php", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json;charset=utf-8"
        },
        "body": JSON.stringify(content)
    }).then(function (res) {
        return res.json()
    }).then(function (params) {
        if (params['code'] == 200) { 
            setCookie('userid', username, 10000000)
            window.location.href = 'chat.html'
        } else {
            alert(params['comment'])
        }
    })
    console.log(document.cookie)
}

function signup() { 
    let username = document.getElementById('sname').value.trim()
    let pw = document.getElementById('spw').value.trim()
    content = {
        'type': 'signup', 
        'username': String(username),
        'pw': String(pw),
    }
    fetch("../backend/auth.php", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json;charset=utf-8"
        },
        "body": JSON.stringify(content)
    }).then(function (res) {
        return res.json()
    }).then(function (params) { 
        if (params['code'] == 200) { 
            setCookie('userid', username, 10000000)
            window.location.href = 'chat.html'
        } else {
            alert(params['comment'])
        }
    })
    console.log(document.cookie)

}

function inputcheck() {

}


document.getElementById('loginsubmit').addEventListener('click', login)
document.getElementById('signupsubmit').addEventListener('click', signup)