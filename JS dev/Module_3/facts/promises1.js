// this is not a good coding style so we should use then and catch
// here we are waiting for an random amount of time and manually calling the functions;
// check promises2.js
let fs = require("fs");
function myPromisifiedFsReader(filePath)
{
    return new Promise(function(resolve , reject){
        fs.readFile(filePath,function (err , data){
            if(err){
                console.log(err);
                reject(err);
            }
            else{
                console.log(data + " ");
                resolve(data);
            }
        })
    })
}
let fileReadPromise = myPromisifiedFsReader("./f1.txt");
console.log(fileReadPromise);

// set time out is an async function executed on the node api , we add a delay in this
// the set time out function will automatically come to the event queue after 1 second(1000 ms) and will
// gets executed as a normal async function does and actually execute the inside function;;;;

setTimeout(function(){
    console.log(fileReadPromise + " ");
},1000);