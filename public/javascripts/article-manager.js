/* 
    刪除文章
    @param id 文章id
*/
const deleteArticle = async (id) => {
    const response = await fetch(`/api/articles`, {
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
        reloadArticlesList();
    }
}

/*
    重新載入文章列表
*/
const reloadArticlesList = async() => {
    const response = await fetch('/api/articles', {
        method: 'GET'
    }).then(async (res) => {
        return await res.json();
    });

    let articlesList = '';
    console.log({'js': response});
    for (let i = 0; i < response.length; i++) {
        articlesList += `
        <tr>
            <th scope="row">${response[i].id}</th>
            <td>${response[i].title}</td>
            <td>${response[i].category}</td>
            <td>${response[i].name}(${response[i].account})</td>
            <td>${(response[i].createAt)}</td>
            <td>
                <a href="/article-manager/editor?mode=edit&id=${response[i].id}" class="btn btn-primary">編輯</a>
                <button type="button" class="btn btn-danger" onclick="deleteArticle(${response[i].id})">刪除</button>
            </td>
        </tr>`;
    
    }
    document.querySelector("#articles-list").innerHTML = articlesList;
}

reloadArticlesList();