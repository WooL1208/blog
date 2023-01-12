const loadUserdata = async() => {
    const response = await fetch('/api/member/now', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(async (res) => {
        return await res.json();
    });
    document.getElementById('username').value = response.name;
}

const editUserdata = async() => {
    const name = document.getElementById('username').value;
    const oldPassword = document.getElementById('old-password').value;
    const newPassword = document.getElementById('new-password').value;

    const response = await fetch('/api/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            oldPassword,
            newPassword
        })
    }).then(async (res) => {
        return await res.json();
    });


    if (response.status) {
        returnToHome();
    } else {
        document.getElementById('warning').style.display = "";
    }

}

const returnToHome = async() => {
    location.href = '/';
}

document.getElementById('edit-btn').addEventListener('click', editUserdata);
document.getElementById('return-btn').addEventListener('click', returnToHome);

await loadUserdata();