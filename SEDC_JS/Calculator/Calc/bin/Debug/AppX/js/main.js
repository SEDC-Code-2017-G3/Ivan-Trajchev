//SEDC CODE ACADEMY - G3 - IVAN TRAJCHEV
//CALCULATOR WITHOUT USING EVAL

class Calculator {
    constructor() {
        this.printMath = document.getElementById("display-math");
        this.printFinal = document.getElementById("display-final");
        this.btn = document.getElementById("buttons");

        this.operation = {
            '+': (a, b) => a += b,
            '-': (a, b) => a -= b,
            '*': (a, b) => a *= b,
            '/': (a, b) => a /= b,
            "<sup>2</sup>": (a) => Math.pow(a, 2),
            "&#8730;": (a, b) => Math.sqrt(b)
        }

        this.calculationHandler = (arr, op1, op2) => {
            let doPrint = false;
            let numA, numB, op;
            while ((op = arr.indexOf(op1)) != -1 || (op = arr.indexOf(op2)) != -1) {
                numA = op - 1; numB = op + 1;
                arr[numA] = this.operation[arr[op]](Number(arr[numA]), Number(arr[numB]));
                if (arr[numA] % 1 !== 0)
                    arr[numA] = Math.round(arr[numA] * 10000) / 10000;
                arr.splice(op, 2);
                doPrint = true;
            }
            if (doPrint) this.printMath.innerText += "\n" + arr.join(" ");
        }
    }
}

let Calc = new Calculator();

//DRAW NUMBER AND OPERATOR BUTTONS
let symbols = [".", "+", "-", "*", "/", "s", "r", "=", "c"];
let symbolLen = symbols.length;
for (let i = 0; i < 10 + symbolLen; i++) {
    if (i < 10) {
        Calc.btn.innerHTML += `<button class="btn btn-dark" value="${i}">${i}</button>`;
    }
    else {
        let symbol;
        switch (symbols[i - 10]) {
            case "s":
                symbol = "x<sup>2</sup>";
                break;
            case "r":
                symbol = "&#8730;";
                break;
            default:
                symbol = symbols[i - 10];
                break;
        }
        Calc.btn.innerHTML +=
            `<button class="btn btn-dark" value="${symbols[i - 10]}">${symbol}</button>`;
    }
}


let isLastNum = false;
let numberStr = "";
let equationStr = "";

function inputHandler(evt) {

    if (numberStr.length <= 10 && !isNaN(evt) || evt == "." && numberStr.indexOf('.') == -1) {
        numberStr += evt;
        Calc.printMath.innerHTML = equationStr + numberStr;
        isLastNum = true;
    }

    else if (/[\+\-\*\/csr]/.test(evt) && isLastNum) {
        let first, second, number;
        numberStr > 0 ? number = parseFloat(numberStr) : number = "";
        switch (evt) {
            case "r":
                first = "&nbsp; &#8730;";
                second = number;
                break;
            case "s":
                first = number;
                second = "<sup>2</sup>";
                break;
            case "c":
                first = "";
                second = "";
                equationStr = "";
                isLastNum = false;
                break;
            default:
                first = number;
                second = evt;
                isLastNum = false;
                break;

        }
        equationStr += first + " " + second + " ";
        Calc.printMath.innerHTML = equationStr;
        numberStr = "";
    }
    else if (evt == "=" || evt == "Enter" && isLastNum) {
        equationStr += numberStr;
        let equationArr = equationStr.split(" ");

        Calc.printMath.innerHTML += " = ";
        Calc.calculationHandler(equationArr, "<sup>2</sup>", "&#8730;");
        Calc.calculationHandler(equationArr, "*", "/");
        Calc.calculationHandler(equationArr, "+", "-");
    }
}

// EVENT LISTENERS FOR KEYBOARD AND BUTTONS
Calc.btn.addEventListener("click", evt => {
    inputHandler(evt.target.value);
}, false);

document.addEventListener("keydown", evt => {
    inputHandler(evt.key);
});