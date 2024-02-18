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
    let uiser = document.getElementById('luid').value.trim()
    let pw = document.getElementById('lpw').value.trim()
    let content = { 'type': 'login', 'userid': String(uiser), 'pw': String(pw) }

    fetch("../backend/auth.php", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json;charset=utf-8"
        },
        "body": JSON.stringify(content)
    }).then(function (res) {
        return res.text()
    }).then(function (params) {
        if (params == 420) {
            alert('credentials are wrong    ' + params)
        } else if (params == 520) {
            alert('server error     ' + params)
        } else if (params == 200) {
            alert('authenticated    ' + params)
            setCookie('userid', uiser, 10000)
        } else {
            alert('unknown error ' + params)

        }
    })
    console.log(document.cookie)
}
function signup() {
    let uid = document.getElementById('suid').value.trim()
    let username = document.getElementById('sname').value.trim()
    let pw = document.getElementById('spw').value.trim()
    content = {
        'type': 'signup',
        'userid': String(uid),
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
        return res.text()
    }).then(function (params) {
        if (params == 420) {
            alert('user exists already  ' + params)
        } else if ((params == 520) || (params == 530)) {
            alert('server error(duplicate)  ' + params)
        } else if (params == 200) {
            alert('success  ' + params)
            setCookie('userid', uiser, 10000)
        } else {
            alert('unknown error ' + params)
        }
    })
    console.log(document.cookie)

}

function inputcheck() {

}


document.getElementById('loginsubmit').addEventListener('click', login)
document.getElementById('signupsubmit').addEventListener('click', signup)