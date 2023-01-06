const login = async (event) => {
    event.preventDefault()
    const name = document.getElementById('name').value;
    const account = document.getElementById('account').value;
    const password = document.getElementById('password').value;

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
        document.getElementById('warning').style.visibility = "visible";
    }
};

document.getElementById('register').addEventListener('click', login);
