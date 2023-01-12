const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

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
    let editBtn = '';

    let dataRange = await getDataLength(nowPage, memberResponse);
    let memberDataList = memberResponse.slice(dataRange.min, dataRange.max);
    if (memberDataList.length > 0) {
        for (let i = 0; i < memberDataList.length; i++) {
            let identity;
            if (memberDataList[i].is_admin == 1) {
                identity = '管理員';
            } else {
                identity = '會員';
            }
            if (memberDataList[i].id == 1) {
                editBtn = `<td><button style="visibility:hidden" class="btn btn-primary">編輯</button></td>`;
            } else {
                editBtn = `<td>
                                <a href="/member-manager/editor?id=${memberDataList[i].id}&page=${dataRange.current}&searchIdentity=${isAdmin}&searchUser=${username}" class="btn btn-primary">編輯</a>
                                <button type="button" class="btn btn-danger" onclick="deleteMember(${memberDataList[i].id}, ${dataRange.current})">刪除</button>
                            </td> `;
            }

            memberList += `
            <tr>
                <th scope="row">${memberDataList[i].id}</th>
                <td>${identity}</td>
                <td>${memberDataList[i].name}</td>
                <td>${memberDataList[i].account}</td>` +
                `${editBtn}` +
            `</tr>`;
        }
    }

    document.querySelector('#member-list').innerHTML = memberList;

    let str = '';

    if (dataRange.hasPage) {
        str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(dataRange.current) - 1}">＜</a></li>`;
    } else {
        str += `<li class="page-item disabled"><span class="page-link">＜</span></li>`;
    }

    for (let i = 1; i <= dataRange.total; i++) {
        if (Number(dataRange.current) === i) {
            str += `<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        } else {
            str += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        }
    };

    if ((await dataRange).hasNext) {
        str += `<li class="page-item"><a class="page-link" href="#" data-page="${Number(dataRange.current) + 1}">＞</a></li>`;
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
    globalNowPage = page;
    reloadMemberData(page);
}



document.getElementById('search-is-admin').addEventListener('change', async (e) => { isAdmin = e.target.value; reloadMemberData(globalNowPage); });
document.getElementById('search-name').addEventListener('keyup', async (e) => { username = e.target.value; reloadMemberData(globalNowPage);  });


pageId.addEventListener('click', switchPage);

if (params.page) {
    globalNowPage = Number(params.page);
}
if (params.isAdmin) {
    isAdmin = Number(params.isAdmin);
    document.getElementById('search-is-admin').value = isAdmin;
}
if (params.name) {
    username = params.name;
    document.getElementById('search-name').value = username;
}


reloadMemberData(globalNowPage);