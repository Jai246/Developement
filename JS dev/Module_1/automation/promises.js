// state 
// final 

let fs = require("fs");
function myPromisiedFsReader(filePath) {
    return new Promise(function cb(resolve, reject) {
        fs.readFile(filePath, function cb(err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data)
                console.log(data+"");
            }
        })
    })
}
console.log("Before");
let fileReadPromise = myPromisiedFsReader("./f1.txt");
console.log("20", fileReadPromise);
//1sec -> async (1sec)
setTimeout(function () {
    console.log("23", fileReadPromise+"");
}, 1000);


// function call -> then is synchronous 


// this will always run async
function scb(data) {
    console.log("hello", data);
    return undefined;
}

let thenNpromise = fileReadPromise.then(scb)
fileReadPromise.then(scb).then(scb2);
function scb2(data) {
    console.log(data);
}
setTimeout(function () {
    console.log("41", thenNpromise)
}, 2000);

function fcb(err) {
    console.log("hello", err);
}
fileReadPromise.catch(fcb);

console.log("after");