import { escapeHtml } from './utils.js';

const getArticles = async(response) => {
    const checked = await document.querySelector('input[name=btnradio]:checked')

    if (checked.id === 'btnradio1') {
        return response
    }
    if (checked.id === 'btnradio2') {
        return response.filter(article => article.category === '生活')
    }
    if (checked.id === 'btnradio3') {
        return response.filter(article => article.category === '科技')
    }
    if (checked.id === 'btnradio4') {
        return response.filter(article => article.category === '美食')
    }
    if (checked.id === 'btnradio5') {
        return response.filter(article => article.category === '理財')
    }
};

const reloadArticles = async() => {
    const response = await fetch('/api/articles', {
        method: 'GET',
    }).then(async (res) => {
        return await res.json();
    });

    const articles = await getArticles(response);

    let articleList = '';

    for (let i = 0; i < articles.length; i++) {
        if (i % 3 === 0) {
            articleList += `<div class="row mb-3">`
        }
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
                    <p class="card-text">${escapeHtml(articles[i].content)}</p>
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

reloadArticles();