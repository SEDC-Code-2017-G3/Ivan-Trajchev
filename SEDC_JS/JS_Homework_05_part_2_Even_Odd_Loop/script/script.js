// JavaScript source code
const container = document.querySelector(".container");

function write(i, suf) {
    container.insertAdjacentHTML("beforeend", `${i} ${suf}`)
}

for (let i = 1; i <= 20; i++) {
    i % 2 === 0 ? write(i, "</br>") : write(i, " ");

}
