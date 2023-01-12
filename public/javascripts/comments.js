//import { escapeHtml } from './utils.js';

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
        <h1 class="card-title">${ response[0].title }</h1>
        <p class="card-text">${ response[0].content }</p>
    </div>
    `;

    document.querySelector(`#article-content`).innerHTML = articleContent;
};

const showUserName = async (userInfo) => {
    let userName = '';
    console.log(userInfo);
    if (userInfo) {
        console.log(userInfo.name);
        userName = `
        <label>${userInfo.name}</label>
        `;
    } else {
        userName = `
        <span class="text-sm font-medium">尚未登入</span>
        `;
    }

    document.querySelector(`#user-name`).innerHTML = userName;
};

const showCommentBtn = async (userInfo) => {
    const commentContent = document.getElementById(`write-comment`).value;
    let commentBtn = '';

    if (commentContent !== '' && userInfo) {
        commentBtn = `
        <button class="btn btn-primary" id="add-comment">留言</button>
        `;
    } else {
        commentBtn = `
        <button class="btn btn-primary" disabled>留言</button>
        `;
    }

    document.querySelector(`#comment-btn`).innerHTML = commentBtn;
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
        location = `/comment?id=${articleId}`;
    } else {
        document.getElementById('comment-warning').style.visibility = 'visible';
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

        const commentUserName = response[i].name;
        const commentContent = response[i].content;

        readComment += `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title>${ commentUserName }</h5>
                <p class="card-text">${ commentContent }</p>
            </div>
        </div>
        `;
    }

    document.querySelector(`#read-comment`).innerHTML = readComment;
};

const reloadAll = async () => {
    const response = await fetch(`/api/member/now`, {
        method: 'GET'
    }).then(async (res) => {
        return await res.json();
    });

    showArticle();
    showUserName(response);
    showCommentBtn(response);
    showComment();
};

reloadAll();
document.getElementById(`write-comment`).addEventListener('change', showCommentBtn);
document.getElementById(`add-comment`).addEventListener('click', addComment);
