const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

const getUser = async () => {
    const response = await fetch(`/api/member?id=${params.id}`, {
        method: 'GET'
    }).then(async (res) => {
        return await res.json();
    });
    return response;
}

const setUser = async () => {
    const user = await getUser();
    document.getElementById('edit-name').value = user.name;
}

const editMember = async (event) => {
    event.preventDefault();
    const identity = document.getElementById('identity').value;
    const member = document.getElementById('edit-name').value;

    console.log(identity, member);

    const response = await fetch('/api/member', {
        method: 'PUT',
        body: JSON.stringify({ id: params.id, identity, member }),
        headers: {
            'content-type': 'application/json',
        },
    }).then(async (res) => {
        return await res.json();
    });

    if (response.status) {
        location = '/member-manager';
    } else {
        document.getElementById('member-warning').style.visibility = "visible";
    }
}

document.getElementById('edit-member').addEventListener('click', editMember);
document.addEventListener("DOMContentLoaded", function () {
    setUser();
});