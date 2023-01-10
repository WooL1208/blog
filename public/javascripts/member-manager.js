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
    let memberList = '';
    // let i = 0; i < memberResponse.length ; i++
    let dataRange = getDataLength();
    for (let i = (await dataRange).min; i < (await dataRange).max ; i++) {
        let identity;
        if (memberResponse[i].is_admin == 1){
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
                <button type="button" class="btn btn-danger" onclick="deleteMember(${memberResponse[i].id})">刪除</button>
            </td>
        </tr>`;
    }

    document.querySelector('#member-list').innerHTML = memberList;
};

const getDataLength = async () => {
    const response = await fetch('/api/member', {
        method: 'GET'
    }).then(async (res) => {
        return await res.json();
    });

    let dataTotal = response.length;

    // 要顯示在畫面上的資料數量，預設每一頁只顯示十筆資料。
    let dataShow = 10;
    let pageTotal = Math.ceil(dataTotal / dataShow);
    console.log(`全部資料:${dataTotal} 每一頁顯示:${dataShow}筆 總頁數:${pageTotal}`);

    let currentPage = 1;

    if (currentPage > pageTotal) {
        currentPage = pageTotal;
    }

    let minData = (currentPage * dataShow) - dataShow;
    let maxData = (currentPage * dataShow);

    const page = {
        pageTotal,
        currentPage,
        hasPage: currentPage > 1,
        hasNext: currentPage < pageTotal,
    }
    pageBtn(page);

    return {min:minData, max:maxData}
}

const pageId = document.getElementById('page-id');

function pageBtn (page){
    let str = '';
    const total = page.dataTotal;
    
    for(let i = 0; i < total; i++){
        str +=`<li class="page-item"><a class="page-link" href="#">${i}</a></li>`;
    };
    // document.querySelector('#page-id').innerHTML = str;
    pageId.innerHTML = str;
}

// getDataLength();
reloadMemberData();