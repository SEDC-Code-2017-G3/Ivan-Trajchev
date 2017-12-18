//START CREATE OBJECTS
let Nav = {
    nav: document.getElementById("nav"),
    colapse: {
        btn: document.getElementById("nav__icon"),
        menu: document.getElementById("nav__menu__colapse")
    },

    topMenu: document.getElementById("nav__top__menu"),
    botMenu: document.getElementById("nav__bottom__menu")
    // srchBar: {
    //     input: document.getElementById("srch-in"),
    //     btn: document.getElementById("srch-btn"),
    //     active: () => {
    //         this.input.style.width = "calc(100% - 80px)";
    //     }
    // }

}

let Main = {
    main: document.getElementById("main")
}

let Foot = {
    footer: document.getElementById("foot"),
    bToTop: {
        btn: document.getElementById("back-to-top")
    }
}
//END CREATE OBJECTS

// //START DECLARE FUNCTIONS
function dispTogle(...arguments) {
    disp === 1 ?
        arguments.forEach(element => {
            element.classList.add("mob-disp-none");
        }) :
        arguments.forEach(element => {
            element.classList.remove("mob-disp-none");
        });
}
// //END DECLARE FUNCTIONS

//START DECLARE VARIABLES
let disp = 1;
//END DECLARE VARIABLES

//START ADD EVENT LISTENERS
let scroll = false;
window.addEventListener("scroll", () => scroll = true);
setInterval(() => {
    if (scroll) {
        Foot.bToTop.btn.classList.remove("hidden");
        scroll = false
        setTimeout(() => Foot.bToTop.btn.classList.add("hidden"), 1500);
    }
}, 250);

Nav.colapse.btn.addEventListener("click", () => {
    dispTogle(Main.main, Foot.footer);
    disp = disp ^ 1;
    dispTogle(Nav.topMenu, Nav.botMenu);
    if (disp === 0) {
        Nav.nav.style.height = "100vh";

    } else{
        Nav.nav.style.height = "57px";
    }
});
// //END ADD EVENT LISTENERS