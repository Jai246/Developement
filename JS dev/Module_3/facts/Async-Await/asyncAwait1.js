let fs = require("fs");

function myPromisiedFsReader(filePath) {
    return new Promise(function cb(resolve, reject) {
        fs.readFile(filePath, function cb(err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data)
            }
        })
    })

}

// Promise consume older method
// let promise = myPromisiedFsReader("f1.txt");
// promise
// .then(function (data) {
//     console.log("data " + data)
// }).catch(function (err) {
//     console.log("err " + err);
// })

(async function fn() 
{
    try {
        let promise = myPromisiedFsReader("f1.txt");
        let data = await promise;
        console.log("data " + data);
    } catch (err) {
        console.log("err" + err);
    }
})();