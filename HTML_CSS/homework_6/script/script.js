//Elements selectors
const head = document.getElementById("head");
const container = document.querySelector("#container");
const pName = document.querySelector("#pName");

class CompositionC_red {
    constructor() {
        this.selector = null
        this.classes = ['red', 'white', 'white', 'white', 'yellow', 'white', 'blue', 'white', 'white']
        this.link = "css/composition-C.css"
        this.legend = "Composition C, 1935"
    }
}

class CompositionRBY_white {

    constructor() {
        this.selector = null
        this.classes = ['white', 'red', 'white', 'blue', 'white', 'white', 'yellow']
        this.link =  "css/composition-RBY.css"
        this.legend = "Composition in Red, Blue, and Yellow, 1930"
    }
}

class Composition_blue {
    
        constructor() {
            this.selector = null
            this.classes = ['red', 'white', 'white', 'white', 'blue', 'yellow', 'white']
            this.link =  "css/composition.css"
            this.legend = "Composition, 1929"
        }
    }

let compositionC_red = new CompositionC_red();
let compositionRBY_white = new CompositionRBY_white;
let composition_blue = new Composition_blue;

//FUNCTIONS DECLARATIONS

//Function for replacing css
function replaceCSS(url) {
    head.insertAdjacentHTML("beforeend", `<link rel="stylesheet" href="${url}">`);
    setTimeout(() => head.removeChild(head.lastChild.previousSibling), 1);
}

function changePainting(composition) {
    let section, classLen, sectLen;
    section = document.querySelectorAll(".section");
    
    classLen = composition.classes.length;
    sectLen = section.length;

    for (let i = 0; i < classLen; i++) {
        section[i].classList.remove("red", "white", "yellow", "blue");
        section[i].classList.add(composition.classes[i]);
    }

    compositionC_red.selector = document.querySelectorAll(".red");
    compositionRBY_white.selector = document.querySelectorAll(".white");
    composition_blue.selector = document.querySelectorAll(".blue");

    pName.innerHTML = composition.legend;
}

//Add click listener for multiple elements
function addListener(composition, color) {
    for(let i = 0; i < composition.selector.length; i++){
        
        composition.selector[i].addEventListener("click", (c) => {
            // c.target.style.backgroundColor = color;
            changePainting(composition)
            replaceCSS(composition.link);
        });
    }
}

// Load css for Default painting
changePainting(compositionRBY_white);
replaceCSS(compositionRBY_white.link);

//Engage click listeners for the squares
addListener(compositionC_red, "red");
addListener(compositionRBY_white, "white");
addListener(composition_blue, "blue");
