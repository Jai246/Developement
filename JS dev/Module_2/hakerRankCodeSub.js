'use strict';
const loginLink = "https://www.hackerrank.com/auth/login";
const emailpassObj = require("./secrets");
const codesObj = require("./codes");
const answers = codesObj.answers;
const puppeteer = require("puppeteer")
// creates headless browser
let browserStartPromise = puppeteer.launch({
    // visible 
    headless: false,
    // type 1sec // slowMo: 1000,
    defaultViewport: null,
    // browser setting 
    args: ["--start-maximized", "--disable-notifications"]
});
let page, browser;
browserStartPromise
    .then(function (browserObj) {
        console.log("Browser opened");
        // new tab 
        browser = browserObj
        let browserTabOpenPromise = browserObj.newPage();
        return browserTabOpenPromise;
    }).then(function (newTab) {
        page = newTab
        console.log("new tab opened ")
        let gPageOpenPromise = newTab.goto(loginLink);
        return gPageOpenPromise;
    }).then(function () {

        let emailWillBeEnteredPromise = page.type("input[id='input-1']", emailpassObj.email, { delay: 50 });
        return emailWillBeEnteredPromise;
    }).then(function () {
        let passwordWillBeEnteredPromise = page.type("input[type='password']", emailpassObj.password, { delay: 50 });
        return passwordWillBeEnteredPromise;
    }).then(function () {
        let loginWillBeDOnepromise =
            page.click('button[data-analytics="LoginPassword"]', { delay: 100 });
        return loginWillBeDOnepromise;
    })
    .then(function () {
        let clickedOnAlgoPromise =
            waitAndClick(".topic-card a[data-attr1='algorithms'", page);
        return clickedOnAlgoPromise;
    }).then(function (){
        page.waitFor(5000);
    }).then(function () {
        let getToWarmUp =
            waitAndClick("input[value='warmup']", page);
        return getToWarmUp;
    }).then(function (){
        page.waitFor(5000);
    }).then(function () {
        let AllChallengesArrPromise = page.$$(".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled", { delay: 100 });
        return AllChallengesArrPromise;
    }).then(function (questionsArr) {
        // n number of question first 
        console.log("number of questions", questionsArr.length);
        let qWillBeSolvedPromise = questionSolver(page,questionsArr[0],answers[0]);
        return qWillBeSolvedPromise;
    }).then(function () {
        console.log("All Questions Solved");
    }).catch(function (err) {
        reject(err);
    })

    
function waitAndClick(selector, cPage) {
    return new Promise(function (resolve, reject) {
        let waitForModalPromise = cPage.waitForSelector(selector, { visible: true });
        waitForModalPromise.then(function () {
                let clickModal = cPage.click(selector, { delay: 500 });
                return clickModal;
            }).then(function () {
                resolve();
            }).catch(function (err) {
                reject(err);
            })
        })
}



// return a promise -> that will submit a given question 
function questionSolver(page, question, answer) {
    console.log("hello1");
    return new Promise(function (resolve, reject) {
        let qWillBeCLickedPromise = question.click();
        qWillBeCLickedPromise
            .then(function () {
                // focus 
                let waitFOrEditorToBeInFocus =
                    waitAndClick(".monaco-editor.no-user-select.vs", page);
                return waitFOrEditorToBeInFocus;
            })
            // click
            .then(function () {
                return waitAndClick(".checkbox-input", page);
            }).then(function () {
                return page.waitForSelector("textarea.custominput", { visible: true });
            })
            .then(function () {
                return page.type("textarea.custominput", answer, { delay: 0 });
            }).then(function () {
                let ctrlIsPressedP = page.keyboard.down("Control");

                return ctrlIsPressedP;
            }).then(function () {
                let AIsPressedP = page.keyboard.press("A", { delay: 100 });
                return AIsPressedP;
            }).then(function () {
                return page.keyboard.press("X", { delay: 100 });
            }).then(function () {
                let ctrlIsPressedP = page.keyboard.up("Control");
                return ctrlIsPressedP;
            })
            .then(function () {
                // focus 
                let waitFOrEditorToBeInFocus = waitAndClick(".monaco-editor.no-user-select.vs", page);
                return waitFOrEditorToBeInFocus;
            })
            .then(function () {
                let ctrlIsPressedP = page.keyboard.down("Control");
                return ctrlIsPressedP;
            })
            .then(function () {
                let AIsPressedP = page.keyboard.press("A", { delay: 100 });
                return AIsPressedP;
            }).then(function () {
                let AIsPressedP = page.keyboard.press("V", { delay: 100 });
                return AIsPressedP;
            }).then(function () {
                let ctrlIsPressedP = page.keyboard.up("Control");
                return ctrlIsPressedP;
            }).then(function () {
                return page.click(".hr-monaco__run-code", { delay: 100 });
            })
            .then(function () {
                resolve();
            }).catch(function (err) {
                reject(err);
            })
    })
}