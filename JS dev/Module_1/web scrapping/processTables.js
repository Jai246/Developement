const fs = require("fs");
const cheerio = require("cheerio");
const request = require("request");
const path = require("path");
let currfolderPath = "./IPL";

let linkHTML = "";

function makeleaderBoard(linkScore)
{
    request(linkScore,function(error,response,html)
    {
        process(html);
    });

    
}

//let linkScore = "https://www.espncricinfo.com/series/ipl-2021-1249214/punjab-kings-vs-delhi-capitals-29th-match-1254086/full-scorecard";
// Remember
// find and text both are selector tool functions
function process(linkScore)
{
    selectTool = cheerio.load(linkScore);
    let TablesInInning = selectTool(".table.batsman"); // selecting all trs

    let teamName = selectTool(".Collapsible .col h5");
    //console.log(teamName.length);

    for(let j = 0;j<TablesInInning.length;j++)
    {
        let AllTr = selectTool(TablesInInning[j]).find("tbody tr");
        let Tname = selectTool(teamName[j]).text();
        Tname = (Tname.split("INNINGS")[0]).trim();

        let moreDetails = selectTool(".match-info.match-info-MATCH .description");
        moreDetails = selectTool(moreDetails).text();
        moreDetails = moreDetails.split(",");

        let Result = selectTool(".match-info.match-info-MATCH .status-text").text().trim();

        if(!isTeamFolderExists(Tname))
        {
            fs.mkdirSync(path.join(currfolderPath,Tname));
        } 

        for(let i = 0;i<AllTr.length;i++)
        {
            let td = selectTool(AllTr[i]).find("td"); // finding td from tr
            if(td.length == 8)
            {
                if(!isPlayerExists(path.join(Tname,selectTool(td[0]).text() + ".json")))
                {
                    fs.writeFileSync(path.join(currfolderPath,Tname,selectTool(td[0]).text() + ".json"),JSON.stringify([]));
                }
                let details = {
                    "MyTeamName" : Tname ,
                    "Name" : selectTool(td[0]).text() ,
                    "Venue" : moreDetails[1] +"" ,
                    "Date" : moreDetails[2] +"",
                    "OpponentTeamName" : (Tname == selectTool(teamName[1]).text().split("INNINGS")[0]) ? selectTool(teamName[0]).text().split("INNINGS")[0] : selectTool(teamName[1]).text().split("INNINGS")[0],
                    "Result" : Result +"",
                    "Runs" : selectTool(td[2]).text() +"" ,
                    "Balls" : selectTool(td[3]).text() +"" ,
                    "Fours" : selectTool(td[5]).text() +"" ,
                    "Sixes" : selectTool(td[6]).text() +"" ,
                    "Sr" : selectTool(td[7]).text() +""
                };

                let content = fs.readFileSync(path.join(currfolderPath,Tname,selectTool(td[0]).text() + ".json"));
                let jsonData = JSON.parse(content);
                // console.log(typeof(jsonData));
                jsonData.push(details);
                let jsonWritable = JSON.stringify(jsonData);
                fs.writeFileSync(path.join(currfolderPath,Tname,selectTool(td[0]).text() + ".json"),jsonWritable);

            } 
            // printing names from td
            // because string would be somewhere insoide the tbody
            // when we print it without text() we will get some objects which describes
            // the properties that it holds not the actual string name;
            // text() will find the string part in the td and print it;
        }
    }   
}

function isTeamFolderExists(teamName)
{
    let temp = path.join(currfolderPath,teamName);
    return fs.existsSync(temp);
}

function isPlayerExists(Name)
{
    let temp = path.join(currfolderPath,Name);
    return fs.existsSync(temp);
}

module.exports = makeleaderBoard;
