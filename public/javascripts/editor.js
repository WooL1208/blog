const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

const addArticle = async (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const content = document.getElementById('content').value;

    console.log(title, category, content);

    const response = await fetch('/api/articles', {
        method: 'POST',
        body: JSON.stringify({ title, category, content }),
        headers: {
            'content-type': 'application/json',
        },
    }).then(async (res) => {
        return await res.json();
    });

    if (response.status) {
        await returnToManager();
    } else {
        document.getElementById('warning').style.visibility = "visible";
    }
}

const getArticle = async () => {
    const response = await fetch(`/api/articles?id=${params.id}`, {
        method: 'GET'
    }).then(async (res) => {
        return await res.json();
    });
    return response[0];
}

const setContent = async () => {
    const article = await getArticle();
    document.getElementById('title').value = article.title;
    document.getElementById('category').value = article.category;
    document.getElementById('content').value = article.content;
    auto_grow(document.getElementById('content'));
}

const editArticle = async (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const content = document.getElementById('content').value;

    console.log(title, category, content);

    const response = await fetch('/api/articles', {
        method: 'PUT',
        body: JSON.stringify({ id: params.id, title, category, content }),
        headers: {
            'content-type': 'application/json',
        },
    }).then(async (res) => {
        return await res.json();
    });

    if (response.status) {
        await returnToManager();
    } else {
        document.getElementById('warning').style.visibility = "visible";
    }

}

const returnToManager = async () => {
    location = `/article-manager?page=${params.page}&searchTitle=${params.searchTitle}&searchCategory=${params.searchCategory}`;
}

function auto_grow(element) {
    element.style.height = "5px";
    element.style.height = (element.scrollHeight)+"px";
}

if (params.mode == 'add') {
    document.getElementById('add-article').style.display = 'inline-block';
    document.getElementById('edit-article').style.display = 'none';
} else if (params.mode == 'edit') {
    setContent();
    document.getElementById('add-article').style.display = 'none';
    document.getElementById('edit-article').style.display = 'inline-block';
}


document.getElementById('add-article').addEventListener('click', addArticle);
document.getElementById('edit-article').addEventListener('click', editArticle);
document.getElementById('return-btn').addEventListener('click', returnToManager);
