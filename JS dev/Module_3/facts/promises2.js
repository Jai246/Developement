let fs = require("fs");

function myPromisifiedFsReader(filePath)
{
    return new Promise(function(resolve , reject){
        fs.readFile(filePath,function (err , data){
            if(err){
                reject(err);
            }
            else{
                resolve(data);
            }
        })
    })
}

let fileReadPromise = myPromisifiedFsReader("./f1.txt"); // initially this will return a pending promise

function successCb(data){
    console.log(data+"");
}

function failureCb(err){
    console.log(err+"");
}
// then and catch is a sync function used to register callback function to promis;;
// then and catch will execute Synchronously


// here on the pending promise that i have recieved , i am attaching a callback function
// and when the promis state will change from stateless to fullfilled/statefull cb function will be called
// and data will be printed


let thenNpromise = fileReadPromise.then(successCb); // returns promise
let catchNpromise = fileReadPromise.catch(failureCb);// returns promise

console.log(typeof(thenNpromise));
console.log(typeof(catchNpromise));

// here we can say that a promise is also a kind of a object


// printing of data will always be done at the end
// like the async functions


