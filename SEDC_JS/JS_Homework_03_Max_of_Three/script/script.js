
let nums = window.prompt("Enter three numbers separated with space").split(" ").map((n) => parseInt(n));
const numdDisp = document.getElementById("numbers").innerHTML = nums;
const maxSelf = document.getElementById("maxSelf");
const maxInf = document.getElementById("maxInf");

// Comparing the numers between themselves

let biggest;

if (nums[0] > nums[1] && nums[0] > nums[2]) {
    biggest = nums[0];
}
else if (nums[1] > nums[0] && nums[1] > nums[2]) {
    biggest = nums[1];
}
else if (nums[2] > nums[0] && nums[2] > nums[1]) {
    biggest = nums[2];
}

maxSelf.innerHTML = biggest;

//Comparing with -Infinity

let max = -Infinity;

if (nums[0] > max) {
    max = nums[0];
}
if (nums[1] > max) {
    max = nums[1];
}
if (nums[2] > max) {
    max = nums[2];
}

maxInf.innerHTML = max;
