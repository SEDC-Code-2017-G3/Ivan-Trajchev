//GET ELEMENTS

// Get Player Scores
const PL_TOTAL = new Array(2);
PL_TOTAL[0] = document.getElementById("player-one__total");
PL_TOTAL[1] = document.getElementById("player-two__total");

const PL_CUR = new Array(2);
PL_CUR[0] = document.getElementById("player-one__current"); 
PL_CUR[1] = document.getElementById("player-two__current");

const STAR = document.querySelectorAll(".star");
const MAIN_SECT = document.querySelectorAll(".main__section");

//Get buttons
const NEW_GAME = document.getElementById("new-game");
const ROLL = document.getElementById("roll");
const HOLD = document.getElementById("hold");

//Get dice
const DICE = document.getElementById("dice");
//END GET ELEMENTS

//SET VARIABLES
let curRound, active;
let play = false;
//END SET VARIABLES

//SET FUNCTIONS
function init() {
    active = 1; // When next() is called inside init() it toggles it to player 0 
    PL_TOTAL[0].innerText = PL_CUR[0].innerText = 0;
    PL_TOTAL[1].innerText = PL_CUR[1].innerText = 0;
    STAR[active].classList.remove("active");
    MAIN_SECT[active].classList.remove("active");
    DICE.classList.add("active");
    play = true;
    next();
}

function next(){
    if(parseInt(PL_TOTAL[active].innerText) >= 100){
        end();
        return;
    }

    curRound = 0;
    PL_CUR[active].innerText = 0;
    STAR[active].classList.remove("active");
    MAIN_SECT[active].classList.remove("active");
    active = active ^ 1;
    STAR[active].classList.add("active");
    MAIN_SECT[active].classList.add("active");

    
}

function roll(player) {
    let rand = Math.floor((Math.random() * 6)) + 1;
    DICE.src = `img/dice-${rand}.png`;
    curRound += rand;
    rand > 1 ? PL_CUR[active].innerText = curRound : next();
}

function hold() {
    PL_TOTAL[active].innerText = parseInt(PL_TOTAL[active].innerText) + curRound;
    PL_CUR[active].innerText = 0;
    next();
}

function end(){
    PL_TOTAL[0].innerText = PL_CUR[0].innerText = 'X';
    PL_TOTAL[1].innerText = PL_CUR[1].innerText = 'X';
    STAR[active].classList.remove("active");
    MAIN_SECT[active].classList.remove("active");
    DICE.classList.remove("active");
    play = false;
}
//END SET FUNCTIONS

//ADD EVENT LISTENERS
NEW_GAME.addEventListener("click", () => init());
ROLL.addEventListener("click", () => play ? roll() : 1);
HOLD.addEventListener("click", () => play ? hold() : 1);

//END ADD EVENT LISTENERS
