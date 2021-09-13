let fs = require("fs");

console.log("before");

let f1ReadPromis = fs.promises.readFile("./f1.txt");

f1ReadPromis.then(function cb(data){
    console.log("content" , data+"");
    return fs.promises.readFile("./f2.txt");
}).then(function cb1(data){
    console.log("content2" , data+"");
    return fs.promises.readFile("./f3.txt");
}).then(function cb2(data){
    console.log("content3",data+"");
})

console.log("After");