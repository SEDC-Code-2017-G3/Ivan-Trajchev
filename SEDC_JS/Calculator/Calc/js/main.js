//
// SEDC CODE ACADEMY - G3 - IVAN TRAJCHEV
//
//--------------------------------------
//
// CALCULATOR WITHOUT USING EVAL
//
//--------------------------------------
//
//The calculator can perfotm all basic operations (+, -, *, /) plus square and square root.
//One can chain operations, e.g. (2 + 2 * SquareRoot(3) - 2 squared), and the output
//will display not just the result but the whole process of operation.
//handles rounding of decimal input e.g. (if entered 1.5000000 ----> 1.5)
//if first input is "." it will convert it to "0." e.g.(.5 -----> 0.5)
//The input can also be entered through keyboard.
//Keys used
// 1-9 ----> numbers
// * / - + ------> basic operations
// = or Enter -------> calculate(equals)
// s ------> squared
// r ------> square root
//---------------------------------------
//HOW IT WORKS
//---------------------------------------
// It takes the input and adds it toa string named numberStr.
// When we enter an operator it concatenates numberStr + the operator to
// a string named equationStr. There is also a boolean variable named isLastNum
// and it turns true if the last input is a number and false if it is an operator
// this prevents adding more than one operator between numbers.
// It breaks this rule only when entering square and square root so we can do 
// for e.g. (2 + square root(3)) where two operators can be side by side
// when hit "=" or "Enter" it turns the string to an array and calls a calculationHandler method
// 3 times according to the precedence of operators. first for square root and square,
// then for *  and / and last for + and -. The method takes two strings, e.g. calculationHandler("+", "-"),
// as arguments and checks if those strings(operators) are present in the array. 
// if they are present it calls another operation method based on the input. Here I use the abilty
// to name object properties and methotds with a string to avoid using if-else statements, and
// call the method directly by the input string (see Calculator.operation object). I use
// a while loop that breaks when all the occurances of an operator are calculated.
// it then prints the result for each call to display the whole process of solving an equation.
//-----------------------------------------------------------------------------------
//
// CALCULATOR CONSTRUCTOR
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
            //Initializing variables. doPrint checks if an operation was performed
            //to print it on screen, and numA, numB and op are the two numbers and the 
            //operation to be performed
            let doPrint = false;
            let numA, numB, op;
            // While loop checks if the operators(arguments) passed exist in the array
            // and asigns one of them to op.
            while ((op = arr.indexOf(op1)) != -1 || (op = arr.indexOf(op2)) != -1) {

                //numA becomes the number before the operator and will be overwriten by the result
                // e.g. if 3 + 2 ---> 3 becomes the result and 2 is added to the result.
                //numB becomes the second number.
                numA = op - 1;
                numB = op + 1;

                //Here the method that corresponds to the op string(the use of strings as property names)
                //in the this.operation object is called. the arguments are numA and numB.
                arr[numA] = this.operation[arr[op]](Number(arr[numA]), Number(arr[numB]));

                //If the result is decimal it rounds the result to maximum 4 decimal places
                if (arr[numA] % 1 !== 0)
                    arr[numA] = Math.round(arr[numA] * 10000) / 10000;
                //Remove operator and second number leaving only the result and print the array
                //in the current state.
                arr.splice(op, 2);
                doPrint = true;
            }
            if (doPrint) this.printMath.innerText += "\n" + arr.join(" ");
        }
    }
}

let Calc = new Calculator();
//---------------------------------------------------------------------------------------

//DRAW NUMBER AND OPERATOR BUTTONS IN HTML
let symbols = [".", "+", "-", "*", "/", "s", "r", "=", "c"];
let symbolLen = symbols.length;
for (let i = 0; i < 10 + symbolLen; i++) {
    if (i < 10) {
        Calc.btn.innerHTML += `<button class="btn btn-dark" value="${i}">${i}</button>`;
    } else {
        // Switch to use r and s for square and square root as value 
        // but print the symbols on the buttons
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
//---------------------------------------------------------

// INPUT AND OUTPUT LOGIC
let isLastNum = false;
let numberStr = "";
let equationStr = "";

function inputHandler(evt) {

    if (equationStr < 11 && !isNaN(evt) || evt == "." && numberStr.indexOf('.') == -1) {

        // if (/\./g.test(numberStr)) {
            numberStr += evt;
            numberStr = parseFloat(Math.round(numberStr * 100) / 100).toString();
        //     numberStr.substring(0, 8);
        // } else {
        //     numberStr += evt;
        //     numberStr.substring(0, 4);
        // }
        // numberStr.Math.round(arr[numA] * 10000) / 10000;
        Calc.printMath.innerHTML = equationStr + numberStr;
        isLastNum = true;
    }
    //operator handler.I had to use length == 1 because regex test captured
    else if (evt.length == 1 && /[\+\-\*\/csr]/g.test(evt) && isLastNum) {
        let first, second, number;
        numberStr > 0 ? number = parseFloat(numberStr) : number = "";
        // Switch to handle special operators (square, square root and clear)
        // square root has to be printed in front of the number while all other
        // operators are printed after. this switch also handles the placement.
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
                first = second = equationStr = "";
                isLastNum = false;
                break;
            default:
                first = number;
                second = evt;
                isLastNum = false;
                break;

        }
        equationStr += first + " " + second + " ";
        // Print equation and clear number input
        Calc.printMath.innerHTML = equationStr;
        numberStr = "";
    } else if ((evt == "=" || evt == "Enter") && isLastNum) {
        //add last number to equationStr and convert to Array
        equationStr += numberStr;
        let equationArr = equationStr.split(" ");
        // Clear whitespace elements from array (side effect from square root)
        // and add "=" symbol to the end.
        equationArr = equationArr.filter(Boolean);
        Calc.printMath.innerHTML += " = ";
        // perform calculations
        Calc.calculationHandler(equationArr, "<sup>2</sup>", "&#8730;", );
        Calc.calculationHandler(equationArr, "*", "/", );
        Calc.calculationHandler(equationArr, "+", "-");
        // Clear Memmory
        equationStr = numberStr = "";
        numberStr += equationArr[0];

    }
}
//-----------------------------------------------------------------

// EVENT LISTENERS FOR KEYBOARD AND BUTTONS

//I used only one event listener on the div containing the buttons
//using caputring to get the click events working.
Calc.btn.addEventListener("click", evt => {
    inputHandler(evt.target.value);
}, false);
// I used keyup because regex test captured the first key pressed
// e.g. if i presed Shift + "=" to get the operator "+" it captured the 
// shift instead of "+".
document.addEventListener("keyup", evt => {
    inputHandler(evt.key);
});