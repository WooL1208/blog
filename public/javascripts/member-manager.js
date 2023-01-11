let pageId = document.getElementById('page-id');
let isAdmin = '';
let username = '';
let globalNowPage = 1;

const deleteMember = async (id, nowPage) => {
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
        reloadMemberData(nowPage);
    }
}

const reloadMemberData = async (nowPage) => {
    const memberResponse = await fetch(`/api/member?isAdmin=${isAdmin}&name=${username}`, {
        method: 'GET'
    }).then(async (res) => {
        return await res.json();
    });
    let memberList = '';

    let dataRange = getDataLength(nowPage, memberResponse);
    if (memberResponse.length > 0) {
        if ((await dataRange).current == (await dataRange).total) {
            for (let i = (await dataRange).min; i < memberResponse.length; i++) {
                let identity;
                if (memberResponse[i].is_admin == 1) {
                    identity = '管理員';
                } else {
                    identity = '會員';
                }
                memberList += `
                <tr>
                    <th scope="row">${memberResponse[i].id}</th>
                    <td>${identity}</td>
                    <td>${memberResponse[i].name}</td>
                    <td>${memberResponse[i].account}</td>
                    <td>
                        <a href="/member-manager/editor?id=${memberResponse[i].id}" class="btn btn-primary">編輯</a>
                        <button type="button" class="btn btn-danger" onclick="deleteMember(${memberResponse[i].id}, ${(await dataRange).current})">刪除</button>
                    </td>
                </tr>`;
            }
        } else {
            for (let i = (await dataRange).min; i < (await dataRange).max; i++) {
                let identity;
                if (memberResponse[i].is_admin == 1) {
                    identity = '管理員';
                } else {
                    identity = '會員';
                }
                memberList += `
                <tr>
                    <th scope="row">${memberResponse[i].id}</th>
                    <td>${identity}</td>
                    <td>${memberResponse[i].name}</td>
                    <td>${memberResponse[i].account}</td>
                    <td>
                        <a href="/member-manager/editor?id=${memberResponse[i].id}" class="btn btn-primary">編輯</a>
                        <button type="button" class="btn btn-danger" onclick="deleteMember(${memberResponse[i].id}, ${(await dataRange).current})">刪除</button>
                    </td>
                </tr>`;
            }
        }
    }

    document.querySelector('#member-list').innerHTML = memberList;

    let str = '';

    if ((await dataRange).hasPage) {
        str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number((await dataRange).current) - 1}">＜</a></li>`;
    } else {
        str += `<li class="page-item disabled"><span class="page-link">＜</span></li>`;
    }

    for (let i = 1; i <= (await dataRange).total; i++) {
        if (Number((await dataRange).current) === i) {
            str += `<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        } else {
            str += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        }
    };

    if ((await dataRange).hasNext) {
        str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number((await dataRange).current) + 1}">＞</a></li>`;
    } else {
        str += `<li class="page-item disabled"><span class="page-link">＞</span></li>`;
    }

    pageId.innerHTML = str;
};

const getDataLength = async (nowPage, response) => {
    let dataTotal = response.length;

    // 預設每一頁只顯示十筆資料。
    let dataShow = 10;
    let pageTotal = Math.ceil(dataTotal / dataShow);
    let currentPage = nowPage;

    if (currentPage > pageTotal) {
        currentPage = pageTotal;
    }

    let minData = (currentPage * dataShow) - dataShow;
    let maxData = (currentPage * dataShow);

    return { min: minData, max: maxData, total: pageTotal, current: currentPage, hasPage: currentPage > 1, hasNext: currentPage < pageTotal }
}

function switchPage(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') return;
    let page = e.target.dataset.page;
    globalPage = page;
    reloadMemberData(page);
}



document.getElementById('search-is-admin').addEventListener('change', async (e) => { isAdmin = e.target.value; reloadMemberData(globalNowPage); });
document.getElementById('search-name').addEventListener('keyup', async (e) => { username = e.target.value; reloadMemberData(globalNowPage);  });


pageId.addEventListener('click', switchPage);

reloadMemberData(1);