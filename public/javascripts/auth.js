/**
 * 登入
 * @param {*} event 
 */

const login = async (event) => {
    event.preventDefault()
    const account = document.getElementById('account').value;
    const password = document.getElementById('password').value;

    if (account === '' || password === '') {
        document.getElementById('login-warning').style.visibility = "visible";
        return;
    }

    const response = await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify({ account, password }),
        headers: {
            'content-type': 'application/json',
        },
    }).then(async (res) => {
        return await res.json();
    });

    if (response.status) {
        location = '/';
    } else {
        document.getElementById('login-warning').style.visibility = "visible";
    }
};

document.getElementById('login').addEventListener('click', login);
