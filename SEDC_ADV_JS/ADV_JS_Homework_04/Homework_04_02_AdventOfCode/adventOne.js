function ajax(url, callback) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = callback;
    xhr.send();
}
ajax("/input.txt", first);

function first(){
    let input = this.response.split("").map( el => parseInt(el));
    // input.reduce((acc, cur)=>{},)
    console.log(input);    
}
