// Delete Item From APi
const delApi = async function () {
    try {
        const del = await (
            await fetch("https://jsonplaceholder.typicode.com/posts/1", {
                method: "DELETE",
            })
        ).json();

        console.log(del);
    } catch (e) {
        console.log(e.message);
    }
};

delApi();

const addApi = async function () {
    try {
    } catch (e) {
        console.log(e);
    }
};

// Api For Create Item
const addItem = document.querySelector("#addItem");

addItem.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {
        title: this.elements.title.value,
        body: this.elements.body.value,
        userId: this.elements.userId.value,
    };
    apiPost(data);
});

const apiPost = async function (data) {
    try {
        const api = await (
            await fetch("https://jsonplaceholder.typicode.com/posts", {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
        ).json();
        console.log(api);
    } catch (e) {
        console.log(e.message);
    }
};

// Api For Update Item
const updateItem = document.querySelector("#updateItem");

updateItem.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {
        title: this.elements.title.value,
        body: this.elements.body.value,
        userId: this.elements.userId.value,
    };
    apiPut(data);
});

const apiPut = async function (data) {
    try {
        const api = await (
            await fetch("https://jsonplaceholder.typicode.com/posts/1", {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
        ).json();
        console.log(api);
    } catch (e) {
        console.log(e.message);
    }
};

// Api For Update Item Of Items
const updateItem_2 = document.querySelector("#updateItem_2");

updateItem_2.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = {
        title: this.elements.title.value,
        body: this.elements.body.value,
        userId: this.elements.userId.value,
    };
    apiPatch(data);
});

const apiPatch = async function (data) {
    try {
        const api = await (
            await fetch("https://jsonplaceholder.typicode.com/posts/1", {
                method: "PUT",
                body: JSON.stringify(data),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            })
        ).json();
        console.log(api);
    } catch (e) {
        console.log(e.message);
    }
};

// All Posts For User
const userPosts = document.querySelector("#userPosts");

function createPosts(posts) {
    posts.forEach((e) => {
        let tr = document.createElement("tr");
        userPosts.appendChild(tr);
        let td = document.createElement("td");
        tr.appendChild(td);
        td.textContent = e.userId;
        td = document.createElement("td");
        tr.appendChild(td);
        td.textContent = e.id;
        td = document.createElement("td");
        tr.appendChild(td);
        td.textContent = e.title;
        td = document.createElement("td");
        tr.appendChild(td);
        td.textContent = e.body;
    });
}

const userPost = async function (cb) {
    try {
        const user = await (
            await fetch("https://jsonplaceholder.typicode.com/posts?userId=1")
        ).json();
        cb(user);
    } catch (e) {
        console.log(e.message);
    }
};

userPost((e) => {
    createPosts(e);
});

// commentPosts
const commentPosts = document.querySelector("#commentPosts");

function comentPosts(posts) {
    posts.forEach((e) => {
        let tr = document.createElement("tr");
        commentPosts.appendChild(tr);
        let td = document.createElement("td");
        tr.appendChild(td);
        td.textContent = e.postId;
        td = document.createElement("td");
        tr.appendChild(td);
        td.textContent = e.id;
        td = document.createElement("td");
        tr.appendChild(td);
        td.textContent = e.name;
        td = document.createElement("td");
        tr.appendChild(td);
        td.textContent = e.email;
        td = document.createElement("td");
        tr.appendChild(td);
        td.textContent = e.body;
    });
}

const commentPost = async function (cb) {
    try {
        const comment = await (
            await fetch("https://jsonplaceholder.typicode.com/posts/1/comments")
        ).json();
        cb(comment);
    } catch (e) {
        console.log(e.message);
    }
};

commentPost((e) => {
    comentPosts(e);
});
