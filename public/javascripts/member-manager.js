const reloadMemberData = async () => {
    const response = await fetch('/member-manager/fetch', {
        method: 'GET'
    }).then(async (res) => {
        return await res.json();
    });

    let memberList = '';

    for (let i = 0; i < response.data.length ; i++) {
        let admin;
        if (response.data[i].is_admin == 1){
            admin = '管理員';
        } else {
            admin = '會員';
        }
        memberList += `
        <tr>
            <th scope="row">${response.data[i].id}</th>
            <td>${admin}</td>
            <td>${response.data[i].name}</td>
            <td>${response.data[i].account}</td>
            <td>
                <a href="/articles/${response.data[i].id}" class="btn btn-primary">編輯</a>
                <button type="button" class="btn btn-danger" onclick="deleteMember(${response.data[i].id})">刪除</button>
            </td>
        </tr>`;
    }

    document.querySelector('#member-list').innerHTML = memberList;
};

reloadMemberData();