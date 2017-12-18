// JavaScript source code
const header = document.getElementById("header");
const menu = document.getElementById("menu");

const items = ["Student", "Grades", "School Schedule"];
const hTitle = ["student panel", "admin / professor panel", "recepcionist panel"];
let selection;

(function input(text) {

    selection = window.prompt(text).toLowerCase();

    switch (selection) {
        case "admin":
        case "professor":
            createMenu(items[0], items[1], items[2], hTitle[1], "crimson");
            break;
        case "student":
            createMenu(null, items[1], items[2], hTitle[0], "goldenrod");
            break;
        case "receptionist":
            createMenu(null, null, items[2], hTitle[2], "darkkhaki");
            break;
        default:
            input("Invalid selection! Try again: ");
            break;
    }
})("Login as: ");

function createMenu(stu, grd, sch, title, color) {

    stu === null ?
        menu.innerHTML = `<li>${grd || ""}</li>
                          <li>${sch}</li>` :
        menu.innerHTML = `<li>${stu}<ul><li>${grd}</li></ul></li>
                          <li>${sch}</li>`;

    header.style.backgroundColor = color;
    header.innerHTML = title;
}
