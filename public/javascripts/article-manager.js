import { escapeHtml } from './utils.js';
let currentPage = 1;

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
        await reloadAll();
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

const getPageArticles = async (articles, page) => {
    const start = (page - 1) * 10;
    const end = start + 10;
    return articles.slice(start, end);
}

const reloadPageNav = async (articleAmount) => {
    const pageUl = document.getElementById("article-page-ul");
    const pageAmount = Math.ceil(articleAmount / 10);
    
    let pageHtml = '';

    // 上一頁按鈕
    if (pageAmount > 1) {
        pageHtml += `<li class="page-item"><a class="page-link" href="#" data-page="${currentPage - 1}">＜</a></li>`;
    } else {
        pageHtml += `<li class="page-item disabled"><span class="page-link">＜</span></li>`;
    }

    for (let i = 1; i <= pageAmount; ++i) {
        if (currentPage === i) {
            pageHtml += `<li class="page-item active"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        } else {
            pageHtml += `<li class="page-item"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
        }
    };

    if (currentPage < pageAmount) {
        pageHtml += `<li class="page-item"><a class="page-link" href="#" data-page="${currentPage + 1}">＞</a></li>`;
    } else {
        pageHtml += `<li class="page-item disabled"><span class="page-link">＞</span></li>`;
    }

    pageUl.innerHTML = pageHtml;
}

const switchPage = async (e) => {
    e.preventDefault();
    if (e.target.nodeName !== 'A') return;
    currentPage = Number(e.target.dataset.page);
    await reloadAll();
}

const reloadAll = async () => {
    const articles = await searchArticles();
    const PageArticles = await getPageArticles(articles, currentPage);
    await reloadArticlesList(PageArticles);
    await reloadPageNav(articles.length);
}


document.getElementById('search-title').addEventListener('keyup', reloadAll);
document.getElementById('search-category').addEventListener('change', reloadAll);
document.getElementById('article-page-ul').addEventListener('click', switchPage);
reloadArticlesList(await reloadAll());