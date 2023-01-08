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
        location = '/article-manager';
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
    return response;
}

const setContent = async () => {
    const article = await getArticle();
    document.getElementById('title').value = article.title;
    document.getElementById('category').value = article.category;
    document.getElementById('content').value = article.content;
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
        location = '/article-manager';
    } else {
        document.getElementById('warning').style.visibility = "visible";
    }

}



if (params.mode == 'add') {
    document.getElementById('add-article').style.display = 'block';
    document.getElementById('edit-article').style.display = 'none';
} else if (params.mode == 'edit') {
    setContent();
    document.getElementById('add-article').style.display = 'none';
    document.getElementById('edit-article').style.display = 'block';
}


document.getElementById('add-article').addEventListener('click', addArticle);
document.getElementById('edit-article').addEventListener('click', editArticle);
