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

function addConvo() { 
    let receip = document.getElementById('addid').value
    let sendr = getCookie('userid')
    if (sendr.length < 1) { return alert('token expired login again') }
    
    let content = {
        "fid": receip,
        "client": getCookie('userid')
    }
    fetch("../backend/addfriend.php", {
        "method": "POST",
        "headers": {
            "Content-Type": "application/json;charset=utf-8"
        },
        "body": JSON.stringify(content)
    }).then(function (res) {
        return res.text()
    }).then(function (params) {
        console.log(params)
    })
}
document.getElementById('add').addEventListener('click', addConvo)