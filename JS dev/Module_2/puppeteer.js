// npm i puppeteer;
let puppeteer = require("puppeteer");
// creates headless browser
let browserStartPromise = puppeteer.launch({
    // visible 
    headless: false,
    // type 1sec // slowMo: 1000,
    defaultViewport: null,
    // browser setting 
    args: ["--start-maximized", "--disable-notifications"]
});
let page, browser, rTab;
browserStartPromise
    .then(function (browserObj) {
        console.log("Browser opened");
        // new tab 
        browser = browserObj
        let browserTabOpenPromise = browserObj.newPage();
        return browserTabOpenPromise;
    }).then(function (newTab) {
        page = newTab
        console.log("new tab opened");
        let gPageOpenPromise =
            newTab.goto("https://www.google.com/");
        return gPageOpenPromise;
    }).then(function () {
        console.log("Google home page opened");
        // keyboard -> data entry 
        let waitforTypingPromise = page.type("input[title='Search']", "pepcoding");
        return waitforTypingPromise;
    }).then(function () {
        // keyboard -> specific keys
        let enterWillBeDonePromise = page.keyboard.press('Enter', { delay: 100 });
        return enterWillBeDonePromise;
    }).then(function () {
        // next page 
        //wait for element to be visible on the page-> whenver you go to a new page 
        console.log("wait for element to be visible");
        let waitForElementPromise = waitAndClick(".LC20lb.DKV0Md", page);
        return waitForElementPromise;
    })
    //.then(function () {
    //     // mouse function 
    //     let elemClickPromise = page.click(".LC20lb.DKV0Md");
    //     return elemClickPromise;
    // })
    .then(function () {
        let wcPromise = handleIfNotPresent("#lp_modal_close", page);
        console.log("wcPromise", wcPromise);
        return wcPromise;
    }).then(function () {
        // page element -> cheerio 
        let allLisPromise = page.$$(".site-nav-li"); // this works as cheerio and return an array
        return allLisPromise;
    }).then(function (allElem) {
        let elementWillBeclickedPromise = allElem[7].click({ delay: 100 });
        return elementWillBeclickedPromise;
    })
    // resources page is on next tab and next tab will take some time to open 
    .then(function () {
        let future2secondAfter = Date.now() + 2000;
        while (Date.now() < future2secondAfter){
        }
        let listofOpenedTabsPromise = browser.pages();
        return listofOpenedTabsPromise;
    })
    .then(function (){ // calling pages function again
        let listofOpenedTabsPromise = browser.pages();
        return listofOpenedTabsPromise;
    })
    .then(function (array) {
        console.log(array.length);
        for(let i = 0;i<array.length;i++) console.log(array[i].url());
        rTab = array[array.length - 1];
        let waitforLevel1Promise = waitAndClick('h2[title="Data Structures and Algorithms in Java [Level 1 - Foundation]"]',rTab);
        return waitforLevel1Promise;
    })
    // .then(function () {
    //     console.log("hogaya");
    //     let clickLevel1Promise = rTab.click('h2[title="Data Structures and Algorithms in Java [Level 1 - Foundation]"]');
    //     return clickLevel1Promise;
    // })
    .then(function () {
        console.log("level 1 will be opened");
    })

    // HERE WE HAVE MADE THIS WAIT AND CLICK FUNCTION BECAUSE WE ARE USING THEM TOGETHER MANY TIMES IN 
    // OUR CODE SO WE JUST CREATED A NEW PROMISE AND COMBINED BOTH THE FUNCTIONS  

    // RESOLVE AND REJECT YOU CAN THINK OF THEM AS TWO STATES
    // RESOLVE SIGNIFIES SUCCESSFULL COMPLETION OF PROMISES
    // REJECT SIGNIFIES THAT THERE IS SOME ISSUE AND TREAT IT AS AN ERROR/ISSUE

    // A "resolved" state indicates a successful completion of the promise
    // , while a "rejected" state indicates a lack of success.
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

// promise -> banner is present or not  -> the code will run 
function handleIfNotPresent(selector, cPage) {
    return new Promise(function (resolve, reject) {
        // wait clickModal
        let waitAndClickPromise = waitAndClick(selector, cPage);
        waitAndClickPromise.then(function () {
            resolve();
        })
        waitAndClickPromise.catch(function (err) { // IF ERROR THEN ALSO TREAT IT AS SUCCESS
            resolve();
        })
    })
}
