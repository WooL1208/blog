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

const editArticle = async (event) => {
    event.preventDefault();
}

document.getElementById('add-article').addEventListener('click', addArticle);
document.getElementById('edit-article').addEventListener('click', editArticle);