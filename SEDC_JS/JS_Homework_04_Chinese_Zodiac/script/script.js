// JavaScript source code

let input = window.prompt("Enter year: ");
const sign = document.getElementById("sign");
const year = document.getElementById("year").innerHTML = input;

function zodiacConverter(year) {
    return (year - 4) % 12;
}

switch (zodiacConverter(input)) {
    case 0:
        sign.innerHTML = "Rat";
        break;
    case 1:
        sign.innerHTML = "Ox";
        break;
    case 2:
        sign.innerHTML = "Tiger";
        break;
    case 3:
        sign.innerHTML = "Rabbit";
        break;
    case 4:
        sign.innerHTML = "Dragon";
        break;
    case 5:
        sign.innerHTML = "Snake";
        break;
    case 6:
        sign.innerHTML = "Horse";
        break;
    case 7:
        sign.innerHTML = "Goat";
        break;
    case 8:
        sign.innerHTML = "Monkey";
        break;
    case 9:
        sign.innerHTML = "Rooster";
        break;
    case 10:
        sign.innerHTML = "Dog";
        break;
    case 11:
        sign.innerHTML = "Pig";
        break;
    default:
        sign.innerHTML = "Error!";
        break;

}
