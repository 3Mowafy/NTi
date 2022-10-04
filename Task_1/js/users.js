// Access HTML Elements
const addArticle = document.getElementById("addArticle");
const articlesInfo = document.getElementById("articlesInfo");
const singleAtricle = document.getElementById("singleAtricle");
const artTitle = document.getElementById("title");
const artContent = document.getElementById("content");
const articleComments = document.getElementById("articleComments");
const addComment = document.getElementById("addComment");

const articleName = ["title", "content"];
// Read From Local Storage

const readFromLocalStorage = (key = "articles") =>
    JSON.parse(localStorage.getItem(key)) || [];

// Write On Local Storage

const writeOnLocalStorage = (val, key = "articles") =>
    localStorage.setItem(key, JSON.stringify(val));

// Add Article
if (addArticle) {
    addArticle.addEventListener("submit", function (e) {
        e.preventDefault();
        const data = { id: Date.now() };
        articleName.forEach(
            (names) => (data[names] = this.elements[names].value)
        );
        const articlesRead = readFromLocalStorage();
        articlesRead.push(data);
        writeOnLocalStorage(articlesRead);
        addArticle.reset();
        window.location.href = "../index.html";
    });
}

// Create Elements Function
const createEl = function (el, parent, txt = null, clas = null) {
    let element = document.createElement(el);
    parent.appendChild(element);
    element.textContent = txt;
    element.classList = clas;
    return element;
};

// Create Articles Info && Show
if (articlesInfo) {
    const artsInfo = readFromLocalStorage();
    artsInfo.forEach((el, i) => {
        const tr = createEl("tr", articlesInfo);
        createEl("td", tr, i + 1);
        const td = createEl("td", tr);
        let link = createEl("a", td, el.title);
        link.style.cursor = "pointer";
        link.addEventListener("click", () => {
            writeOnLocalStorage(el.id, "id");

            writeOnLocalStorage(el, "title");
            readFromLocalStorage("title");
            window.location.href = "pages/single.html";
        });
    });
}

// Create Comments Info && Show

if (singleAtricle) {
    const artshow = readFromLocalStorage("title");

    artTitle.textContent = artshow.title;
    artContent.textContent = artshow.content;

    document.title = artshow.title;

    addComment.addEventListener("submit", function (e) {
        e.preventDefault();

        let comment = {
            id: artshow.id,
            name: this.elements.name.value,
            details: this.elements.details.value,
        };
        const artComments = readFromLocalStorage("comments");
        artComments.push(comment);
        writeOnLocalStorage(artComments, "comments");
        addComment.reset();
        window.location.reload();
    });

    const artComments = readFromLocalStorage("comments");

    artComments.forEach((el) => {
        if (el.id == artshow.id) {
            const trComment = createEl("tr", articleComments);
            createEl(
                "td",
                trComment,
                el.name,
                "bg-white text-dark text-center p-2 align-middle"
            );
            createEl(
                "td",
                trComment,
                el.details,
                "bg-white text-dark text-center p-2"
            );
        }
    });
}
