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
    let opt = document.getElementById('identity').getElementsByTagName('option');
    opt[user.is_admin + 1].selected = true;
    if (params.id == user.id) {
        opt[user.is_admin].disabled = "disabled";
    }
}

const editMember = async (event) => {
    event.preventDefault();
    const identity = document.getElementById('identity').value;
    const member = document.getElementById('edit-name').value;

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
        // reloadMemberData();
    } else {
        document.getElementById('member-warning').style.visibility = "visible";
    }
}

document.getElementById('edit-member').addEventListener('click', editMember);
document.addEventListener("DOMContentLoaded", function () {
    setUser();
});