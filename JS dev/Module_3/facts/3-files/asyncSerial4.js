let fs = require("fs");
let fileReadPromise = fs.promises.readFile("./f1.txt");
fileReadPromise.then(cb1).then(cb2).then(cb3);
console.log("Before");
function cb1(content){
    console.log(content+"");
    return fs.promises.readFile("./f2.txt");
}
function cb2(content){
    console.log(content+"");
    return fs.promises.readFile("./f3.txt");
}
function cb3(content){
    console.log(content+"");
}
console.log("After");