function analyzedata(product, cb) {
    setTimeout(function () {
        // kdjdhvbjdhvbbv
        // dfdvjdfbvjhdf
        cb();
        cb();
        cb();
        cb();
    }, 2000);
}
function promisifiedAnalyzedata(product) {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve();
            resolve();
            reject();
        }, 2000);
    })
}
module.exports = {
    analyzedata: analyzedata,
    promisifiedAnalyzedata: promisifiedAnalyzedata
};