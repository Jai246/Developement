let puppeteer = require("puppeteer");
const loginCredentials = require("./secrets");
let browserStartPromise = puppeteer.launch({
    // visible 
    headless: false, // if we make this true then cromium browser will not be opened
    // type 1sec // slowMo: 1000,
    defaultViewport: null,
    // browser setting 
    args: ["--start-maximized", "--disable-notifications"]
});
let page,browser,rtab;
browserStartPromise.then(function(browserObj){
    console.log("browser opened");
    browser = browserObj;
    browserTabOpenPromise = browserObj.newPage();
    return browserTabOpenPromise;
}).then(function (newTab){
    page = newTab;
    console.log("newTab opened");
    let PageOpenPromise = newTab.goto("https://www.hackerrank.com/auth/login");
    return PageOpenPromise;
}).then(function () {
    let emailWillBeEnteredPromise = page.type("input[id='input-1']", loginCredentials.email, { delay: 50 });
    return emailWillBeEnteredPromise;
}).then(function () {
    let passwordWillBeEnteredPromise = page.type("input[type='password']", loginCredentials.password, { delay: 50 });
    return passwordWillBeEnteredPromise;
}).then(function () {
    let loginWillBeDOnepromise = page.click('button[data-analytics="LoginPassword"]', { delay: 100 });
    return loginWillBeDOnepromise;
}).then(function(){
    console.log("opened hakerrank's dashboard");
    let elemClickPromise = waitAndClick('.topic-card a[data-attr1 = "algorithms"]',page);
    return elemClickPromise;
}).then(function(){
    let mouseClickPromise = waitAndClick("input[value = 'warmup']",page);
    return mouseClickPromise;
}).then(function (){
    let Future5secWait = Date.now() + 5000;
    while(Date.now() < Future5secWait){
    }
    return Future5secWait;
}).then(function (){

})

// HERE WE HAVE MADE THIS WAIT AND CLICK FUNCTION BECAUSE WE ARE USING THEM TOGETHER MANY TIMES IN 
// OUR CODE SO WE JUST CREATED A NEW PROMISE AND COMBINED BOTH THE FUNCTIONS  
function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModalPromise = cPage.waitForSelector(selector, { visible: true });
        waitForModalPromise.then(function (){
                let clickModal = cPage.click(selector, { delay: 100 });
                return clickModal;
            }).then(function (){ // IF EVERY THING IS FINE THEN RESOLVE
                resolve();
            }).catch(function (err) { // IF ERROR THEN REJECT
                reject(err)
            })
    })
}

