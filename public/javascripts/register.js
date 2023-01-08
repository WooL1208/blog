const register = async (event) => {
    event.preventDefault()
    const name = document.getElementById('name').value;
    const account = document.getElementById('register-account').value;
    const password = document.getElementById('register-password').value;

    if (name === '' || account === '' || password === '') {
        document.getElementById('register-warning').style.visibility = "visible";
        return;
    }

    const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ name, account, password }),
        headers: {
            'content-type': 'application/json',
        },
    }).then(async (res) => {
        return await res.json();
    });

    if (response.status) {
        location = '/';
    } else {
        document.getElementById('register-warning').style.visibility = "visible";
    }
};

document.getElementById('register').addEventListener('click', register);
