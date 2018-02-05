document.addEventListener("DOMContentLoaded", () => {
    let fetchRequest = (req) => processResponse(fetch(req));
    let showOnPage = document.getElementById("showonpage");
    let lastSort = "";
    processResponse(fetch(`api/books?showonpage=${showOnPage.value}${lastSort}`));

    document.getElementById("author").addEventListener("click", () => {
        lastSort = `&sortby=author`
        processResponse(fetch(`api/books?showonpage=${showOnPage.value}${lastSort}`))
    });

    document.getElementById("title").addEventListener("click", () => {
        lastSort = `&sortby=title`
        processResponse(fetch(`api/books?showonpage=${showOnPage.value}${lastSort}`))
    });

    document.getElementById("pages").addEventListener("click", (evt) => {
        if (evt.target.localName == 'a') {
            let start = evt.target.attributes.start.value
            processResponse(fetch(`api/books?start=${start}&showonpage=${showOnPage.value}${lastSort}`));
        }
    }, false);

    showOnPage.addEventListener("change", function () {
        fetchRequest(`api/books?showonpage=${this.value}${lastSort}`);
    });


});

function processResponse(response) {
    let table = document.getElementById("books");
    let total = document.getElementById("total");

    response.then(data => data.json())
        .then(value => {
            table.innerHTML = "";
            const tr = document.createElement("tr");
            let th = document.createElement("th");
            th.innerHTML = "Author";
            tr.appendChild(th);
            th = document.createElement("th");
            th.innerHTML = "Book Title";
            tr.appendChild(th);
            table.appendChild(tr);
            for (let index = 0; index < value.books.length; index++) {
                const book = value.books[index];
                const tr = document.createElement("tr");
                let td = document.createElement("td");
                td.innerHTML = book.author;
                tr.appendChild(td);
                td = document.createElement("td");
                td.innerHTML = book.title;
                tr.appendChild(td);
                table.appendChild(tr);
            }
            total.innerHTML = value.total;
            createPageNav(value);
        });
}

function createPageNav(value) {
    let pages = document.getElementById("pages");
    let pageNumber = Math.ceil(value.total / value.booksOnPage);

    pages.innerHTML = "";
    for (let index = 0; index < pageNumber; index++) {
        let li = document.createElement("li");
        let a = document.createElement("a");
        li.appendChild(a);
        pages.appendChild(li);
        a.setAttribute("href", "#" + (index + 1));
        a.setAttribute("start", index * value.booksOnPage);
        a.setAttribute("page", index + 1);
        a.innerHTML = index + 1;
    }
    
    console.log(value);
}