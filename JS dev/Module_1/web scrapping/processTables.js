const fs = require("fs");
const cheerio = require("cheerio");
const request = require("request");
const path = require("path");
let xlsx = require("xlsx");
let currfolderPath = "./IPL";

let linkHTML = "";

function makeleaderBoard(linkScore) {
    request(linkScore, function (error, response, html) {
        process(html);
    });
}
// find and text both are selector tool functions
function process(linkScore) {
    selectTool = cheerio.load(linkScore);
    let TablesInInning = selectTool(".table.batsman"); // selecting all trs

    let teamName = selectTool(".Collapsible .col h5");
    //console.log(teamName.length);

    for (let j = 0; j < TablesInInning.length; j++) {
        let AllTr = selectTool(TablesInInning[j]).find("tbody tr");
        let Tname = selectTool(teamName[j]).text();
        Tname = (Tname.split("INNINGS")[0]).trim();

        let moreDetails = selectTool(".match-info.match-info-MATCH .description");
        moreDetails = selectTool(moreDetails).text();
        moreDetails = moreDetails.split(",");

        let Result = selectTool(".match-info.match-info-MATCH .status-text").text().trim();

        if (!isTeamFolderExists(Tname)) {
            fs.mkdirSync(path.join(currfolderPath, Tname));
        }

        for (let i = 0; i < AllTr.length; i++) {
            let td = selectTool(AllTr[i]).find("td"); // finding td from tr
            if (td.length == 8) {

                let details = {
                    "MyTeamName": Tname,
                    "Name": selectTool(td[0]).text(),
                    "Venue": moreDetails[1] + "",
                    "Date": moreDetails[2] + "",
                    "OpponentTeamName": (Tname == selectTool(teamName[1]).text().split("INNINGS")[0].trim()) ? selectTool(teamName[0]).text().split("INNINGS")[0].trim() : selectTool(teamName[1]).text().split("INNINGS")[0].trim(),
                    "Result": Result + "",
                    "Runs": selectTool(td[2]).text() + "",
                    "Balls": selectTool(td[3]).text() + "",
                    "Fours": selectTool(td[5]).text() + "",
                    "Sixes": selectTool(td[6]).text() + "",
                    "Sr": selectTool(td[7]).text() + ""
                };

                // CREATION OF JSON FILE

                // if (!isPlayerExists(path.join(Tname, selectTool(td[0]).text() + ".json"))) {
                //     fs.writeFileSync(path.join(currfolderPath, Tname, selectTool(td[0]).text() + ".json"), JSON.stringify([]));
                // }

                // let content = fs.readFileSync(path.join(currfolderPath, Tname, selectTool(td[0]).text() + ".json"));
                // let jsonData = JSON.parse(content);
                // // console.log(typeof(jsonData));
                // jsonData.push(details);
                // let jsonWritable = JSON.stringify(jsonData);
                // fs.writeFileSync(path.join(currfolderPath, Tname, selectTool(td[0]).text() + ".json"), jsonWritable);


                // CREATION OF XLSX FILE
                
                let playerFilePath = path.join(currfolderPath, Tname, selectTool(td[0]).text() + ".xlsx");
                let playerArray = [];
                if (fs.existsSync(playerFilePath) == false) {
                    playerArray.push(details);
                } else {
                    // append
                    playerArray = excelReader(playerFilePath, selectTool(td[0]).text());
                    playerArray.push(details);
                }
                // write in the files
                // writeContent(playerFilePath, playerArray);
                excelWriter(playerFilePath, playerArray, selectTool(td[0]).text());

            }
            // printing names from td
            // because string would be somewhere inside the tbody
            // when we print it without text() we will get some objects which describes
            // the properties that it holds not the actual string name;
            // text() will find the string part in the td and print it;
        }
    }
}

function excelWriter(filePath, json, sheetName) {
    // workbook create
    let newWB = xlsx.utils.book_new();
    // worksheet
    let newWS = xlsx.utils.json_to_sheet(json);
    xlsx.utils.book_append_sheet(newWB, newWS, sheetName);
    // excel file create 
    xlsx.writeFile(newWB, filePath);
}
// // json data -> excel format convert
// // -> newwb , ws , sheet name
// // filePath
// read 
//  workbook get
function excelReader(filePath, sheetName) {
    // player workbook
    let wb = xlsx.readFile(filePath);
    // get data from a particular sheet in that wb
    let excelData = wb.Sheets[sheetName];
    // sheet to json 
    let ans = xlsx.utils.sheet_to_json(excelData);
    return ans;
}

function isTeamFolderExists(teamName) {
    let temp = path.join(currfolderPath, teamName);
    return fs.existsSync(temp);
}

function isPlayerExists(Name) {
    let temp = path.join(currfolderPath, Name);
    return fs.existsSync(temp);
}

module.exports = makeleaderBoard;
