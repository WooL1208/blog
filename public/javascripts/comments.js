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
    <div class="card-header">
        ${response[0].category}
    </div>
    <div class="card-body">
        <h1 class="card-title">${ escapeHtml(response[0].title) }</h1>
        <h4 class="card-subtitle mb-2 text-muted">${ response[0].name }</h4>
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
        <label>登入後留言</label>
        `;
    }

    document.querySelector(`#user-name`).innerHTML = userName;
};

const showCommentBtn = async (userInfo) => {
    const commentContent = document.getElementById(`write-comment`).value;

    if (commentContent !== '' && userInfo.id) {
        console.log(userInfo.id);
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

    let readComment = `${response.length} 則留言`;

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
    if (userId) {
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
            document.getElementById('write-comment').value = '';
            await reloadAll();
        } else {
            document.getElementById('comment-warning').className = 'alert alert-danger';
        }
    } else {
        document.getElementById('comment-warning').className = 'alert alert-danger';
    }
};
const reloadCommentBtn = async () => {
    const userInfo = await fetch(`/api/member/now`, {
        method: 'GET'
    }).then(async (res) => {
        return await res.json();
    });
    await showCommentBtn(userInfo);
}
const reloadAll = async () => {
    const response = await fetch(`/api/member/now`, {
        method: 'GET'
    }).then(async (res) => {
        return await res.json();
    });
    await showCommentBtn(response);
    await showUserName(response);
    await showArticle();
    await showComment();
};

document.getElementById(`write-comment`).addEventListener('keyup', reloadCommentBtn);
document.getElementById(`add-comment`).addEventListener('click', addComment);
reloadAll();
