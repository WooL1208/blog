import { escapeHtml } from './utils.js';

let currentPage = 1;
let searchTitle = '';
let searchCategory = '';

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

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
    console.log(articles);
    for (let i = 0; i < articles.length; i++) {
        let createdAt = new Date(articles[i].createdAt).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei', hour12: false })
        let updatedAt = new Date(articles[i].updatedAt).toLocaleString('zh-TW', { timeZone: 'Asia/Taipei', hour12: false })
        articlesList += `
        <tr>
            <th scope="row">${articles[i].id}</th>
            <td>${escapeHtml(articles[i].title)}</td>
            <td>${articles[i].category}</td>
            <td>${articles[i].name}(${articles[i].account})</td>
            <td>${createdAt}</td>
            <td>${updatedAt}</td>
            <td style="text-align:right">
                <a href="/article-manager/editor?mode=edit&id=${articles[i].id}&page=${currentPage}&searchTitle=${searchTitle}&searchCategory=${searchCategory}" class="btn btn-primary">編輯</a>
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

const clickAddArticleBtn = async () => {
    location = `/article-manager/editor?mode=add&page=${currentPage}&searchTitle=${searchTitle}&searchCategory=${searchCategory}`;
}

/**
 * 搜尋文章
 */
const searchArticles = async () => {
    let title = document.getElementById('search-title').value;
    let category = document.getElementById('search-category').value;

    searchTitle = title;
    searchCategory = category;

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

const reloadPageNav = async (pageAmount) => {
    const pageUl = document.getElementById("article-page-ul");
    let pageHtml = '';

    // 上一頁按鈕
    if (currentPage > 1) {
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
    const pageAmount = Math.ceil(articles.length / 10);
    while (currentPage > pageAmount && currentPage !== 1){
        --currentPage;
    }
    const PageArticles = await getPageArticles(articles, currentPage);
    await reloadArticlesList(PageArticles);
    await reloadPageNav(pageAmount);
}


document.getElementById('search-title').addEventListener('keyup', reloadAll);
document.getElementById('search-category').addEventListener('change', reloadAll);
document.getElementById('article-page-ul').addEventListener('click', switchPage);
document.getElementById('add-article-btn').addEventListener('click', clickAddArticleBtn);

if (params.page){
    currentPage = Number(params.page);
}
if (params.searchTitle){
    searchTitle = params.searchTitle;
    document.getElementById('search-title').value = searchTitle;
}
if (params.searchCategory){
    searchCategory = params.searchCategory;
    document.getElementById('search-category').value = searchCategory;
}
await reloadAll();