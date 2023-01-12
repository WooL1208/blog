import { escapeHtml } from './utils.js';

const getArticles = async() => {
    const checked = await document.querySelector('input[name=btnradio]:checked')
    const keyword = await document.getElementById('keyword').value;
    const response = await fetch('/api/articles', {
        method: 'GET',
    }).then(async (res) => {
        return await res.json();
    });

    let articles = [];
    if (checked.id === 'btnradio1') {
        articles =  response;
    }
    if (checked.id === 'btnradio2') {
        articles = response.filter(article => article.category === '生活')
    }
    if (checked.id === 'btnradio3') {
        articles = response.filter(article => article.category === '科技')
    }
    if (checked.id === 'btnradio4') {
        articles = response.filter(article => article.category === '美食')
    }
    if (checked.id === 'btnradio5') {
        articles = response.filter(article => article.category === '理財')
    }
    if (keyword !== '') {
        articles = articles.filter(article => article.title.includes(keyword))
    }

    return articles;
};

const reloadArticles = async() => {
    const articles = await getArticles();

    let articleList = '';

    for (let i = 0; i < articles.length; i++) {
        if (i % 3 === 0) {
            articleList += `<div class="row mb-3">`
        }
        const articleContent = articles[i].content.slice(0, 100);
        articleList += `
        <div class="col-sm-4">
            <div class="card">
                <div class="card-header">
                    ${articles[i].category}
                </div>
                <div class="card-body">
                    <h5 class="card-title">
                        <a href="/comments?id=${articles[i].id}" class="card-link link-dark">
                            ${escapeHtml(articles[i].title)}
                        </a>
                    </h5>
                    <h6 class="card-subtitle mb-2 text-muted">${articles[i].name}</h6>
                    <p class="card-text">${escapeHtml(articleContent)}</p>
                </div>
            </div>
        </div>
        `;
        if (i % 3 === 2 || i === articles.length - 1) {
            articleList += `</div>`
        }
    }

    document.querySelector('#articles-list').innerHTML = articleList;
};

document.querySelectorAll('input[name=btnradio]').forEach(input => input.addEventListener('change', reloadArticles))
document.getElementById('search-articles').addEventListener('click', reloadArticles)
reloadArticles();