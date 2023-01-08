const deleteMember = async (id) => {
    const response = await fetch(`/api/member`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: id
        })
    }).then(async (res) => {
        return await res.json();
    });
    if (response.status) {
        reloadMemberData();
    }
}

const reloadMemberData = async () => {
    const memberResponse = await fetch('/api/member', {
        method: 'GET'
    }).then(async (res) => {
        return await res.json();
    });
    console.log(memberResponse)
    let memberList = '';
    for (let i = 0; i < memberResponse.length ; i++) {
        let admin;
        if (memberResponse[i].is_admin == 1){
            admin = '管理員';
        } else {
            admin = '會員';
        }
        memberList += `
        <tr>
            <th scope="row">${memberResponse[i].id}</th>
            <td>${admin}</td>
            <td>${memberResponse[i].name}</td>
            <td>${memberResponse[i].account}</td>
            <td>
                <a href="/articles/${memberResponse[i].id}" class="btn btn-primary">編輯</a>
                <button type="button" class="btn btn-danger" onclick="deleteMember(${memberResponse[i].id})">刪除</button>
            </td>
        </tr>`;
    }

    document.querySelector('#member-list').innerHTML = memberList;
};

reloadMemberData();