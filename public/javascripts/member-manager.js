const reloadMemberData = async () => {
    const response = await fetch('/member-manager/fetch', {
        method: 'GET'
    }).then(async (res) => {
        return await res.json();
    });

    let memberList = '';

    for (let i = 0; i < response.data.length ; i++) {
        memberList += `
        <tr>
            <th scope="row">${response.data[i].id}</th>
            <td>${response.data[i].is_admin}</td>
            <td>${response.data[i].name}</td>
            <td>${response.data[i].account}</td>
        </tr>`;
    }

    document.querySelector('#member-list').innerHTML = memberList;
};

reloadMemberData();