const priceNode = document.getElementById("price");
const amountNode = document.getElementById("amount");
const discountNode = document.getElementById("discount");
const totalNode = document.getElementById("total");

var price = 999.99;
var amount = 20;
var discount = 0.05;

priceNode.innerText = price;
amountNode.innerText = amount;
discountNode.innerText = `${discount * 100} %`;
totalNode.innerText = (price - discount * price ) * amount;
