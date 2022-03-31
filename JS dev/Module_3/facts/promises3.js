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
    console.log("jai");
}

function failureCb(err){
    console.log("bhambri");
}

fileReadPromise.then(successCb).then(failureCb); // this will print jai bhambri
// a resolved promise is being returned by the myPromisifiedFsReader so then will print jai;;; 
// since promise returned by then(successCb) is a statefull so then(failureCb) will be attached
// to that statefull function and bhambri will also gets printed

fileReadPromise.then(successCb).catch(failureCb); // this will print only jai\
// because catch is being attached to the promise which is returned by "(then)" , since then is successfull
// so bhambri will not get printed











