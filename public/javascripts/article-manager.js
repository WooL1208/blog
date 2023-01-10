import { escapeHtml } from './utils.js';

/**
 * 刪除文章
 * @param {number} id 文章ID
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
        await reloadArticlesList(await getAllArticles());
    }
}

/**
 * 重新載入文章列表
 * @param {Array} articles 文章列表
 */
const reloadArticlesList = async (articles) => {
    let articlesList = '';
    for (let i = 0; i < articles.length; i++) {
        let createdAt = new Date(articles[i].createdAt).toLocaleString('zh-TW', { timeZone: 'UTC', hour12: false })
        let updatedAt = new Date(articles[i].updatedAt).toLocaleString('zh-TW', { timeZone: 'UTC', hour12: false })
        articlesList += `
        <tr>
            <th scope="row">${articles[i].id}</th>
            <td>${escapeHtml(articles[i].title)}</td>
            <td>${articles[i].category}</td>
            <td>${articles[i].name}(${articles[i].account})</td>
            <td>${createdAt}</td>
            <td>${updatedAt}</td>
            <td style="text-align:right">
                <a href="/article-manager/editor?mode=edit&id=${articles[i].id}" class="btn btn-primary">編輯</a>
                <button type="button" class="btn btn-danger delete-btn" value=${articles[i].id}>刪除</button>
            </td>
        </tr>`;
    }
    document.querySelector("#articles-list").innerHTML = articlesList;

    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach((btn) => {
        btn.addEventListener('click', async (e) => {
            await deleteArticle(e.target.value);
        });
    });
}

/**
 * 取得所有文章
 */
const getAllArticles = async () => {
    const response = await fetch('/api/articles', {
        method: 'GET'
    }).then(async (res) => {
        return await res.json();
    });
    return response;
}

/**
 * 搜尋文章
 */
const searchArticles = async () => {
    const title = document.getElementById('search-title').value;
    let category = document.getElementById('search-category').value;
    console.log({title, category});

    if (category == '全部') {
        category = '';
    }

    const response = await fetch(`/api/articles?title=${title}&category=${category}`, {
        method: 'GET'
    }).then(async (res) => {
        return await res.json();
    });
    return response;
}


document.getElementById('search-title').addEventListener('keyup', async (e) => { await reloadArticlesList(await searchArticles()) });
document.getElementById('search-category').addEventListener('change', async (e) => { await reloadArticlesList(await searchArticles()) });
reloadArticlesList(await getAllArticles());