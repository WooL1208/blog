const logout = async (event) => {
    event.preventDefault();
    const response = await fetch('/api/auth', {
        method: 'DELETE'
    }).then(async (res) => {
        return await res.json();
    });

    if (response.status) {
        location = '/';
    } else {
        alert('Logout failed');
    }
};

const logoutBtn = document.getElementById('logout')
if (logoutBtn) {
    logoutBtn.addEventListener('click', logout);
}
