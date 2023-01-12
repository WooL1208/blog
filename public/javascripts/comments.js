import { escapeHtml } from './utils.js';

const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

const showArticle = async () => {
    const response = await fetch(`/api/articles?id=${params.id}`, {
        method: 'GET'
    }).then(async (res) => {
        return await res.json();
    });

    let articleContent = `
    <div class="card-body">
        <h1 class="card-title">${ escapeHtml(response[0].title) }</h1>
        <p class="card-text">${ escapeHtml(response[0].content) }</p>
    </div>
    `;

    document.querySelector(`#article-content`).innerHTML = articleContent;
};

const showUserName = async (userInfo) => {
    let userName = '';
    if (userInfo.id) {
        userName = `
        <label>${userInfo.name}</label>
        `;
    } else {
        userName = `
        <label>尚未登入</label>
        `;
    }

    document.querySelector(`#user-name`).innerHTML = userName;
};

const showCommentBtn = async (userInfo) => {
    const commentContent = document.getElementById(`write-comment`).value;

    if (commentContent !== '' && userInfo.id) {
        document.getElementById(`add-comment`).disabled = false;
    } else {
        document.getElementById(`add-comment`).disabled = true;
    }
};

const showComment = async () => {
    const response = await fetch(`/api/comments?id=${params.id}`, {
        method: 'GET'
    }).then(async (res) => {
        return await res.json();
    });

    response.sort(function (a, b) {
        return a.createdAt < b.createdAt ? 1 : -1;
    });

    let readComment = '';

    for (let i = 0; i < response.length; i++) {

        const userInfo = await fetch(`/api/member?id=${response[i].user_id}`, {
            method: 'GET',
        }).then(async (res) => {
            return await res.json();
        });
        let commentUserName = userInfo.name;
        let commentContent = response[i].content;

        readComment += `
        <div class="card mb-1">
            <div class="card-body">
                <h5 class="card-title">${ escapeHtml(commentUserName) }</h5>
                <p class="card-text">${ escapeHtml(commentContent) }</p>
            </div>
        </div>
        `;
    }

    document.querySelector(`#read-comment`).innerHTML = readComment;
};

const addComment = async () => {
    const userInfo = await fetch(`/api/member/now`, {
        method: 'GET'
    }).then(async (res) => {
        return await res.json();
    });
    const userId = userInfo.id;
    const articleId = params.id;
    const content = document.getElementById(`write-comment`).value;

    const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ userId, articleId, content }),
        headers: {
            'content-type': 'application/json',
        },
    }).then(async (res) => {
        return await res.json();
    });
    console.log(response);
    if (response.status) {
        await reloadAll();
    } else {
        document.getElementById('comment-warning').style.visibility = 'visible';
    }
};

const reloadAll = async () => {
    const response = await fetch(`/api/member/now`, {
        method: 'GET'
    }).then(async (res) => {
        console.log(res.status);
        return await res.json();
    });
    if (response.id) {
        await showUserName(response);
        await showCommentBtn(response);
    }
    await showArticle();
    await showComment();
};

document.getElementById(`write-comment`).addEventListener('keyup', showCommentBtn);
document.getElementById(`add-comment`).addEventListener('click', addComment);
reloadAll();
