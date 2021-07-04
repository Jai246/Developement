const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

function getMatchDetails(matchLink){
    request(matchLink,function(err,res,data){
        processData(data);
    });
}


function processData(html){
    let myDocument = cheerio.load(html);
    let bothInnings = myDocument(".card.content-block.match-scorecard-table .Collapsible");

    for(let i = 0; i < bothInnings.length;i++)
    {
        let oneInning = myDocument(bothInnings[i]);

        let teamName = oneInning.find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        console.log(teamName);

        let allTrs = oneInning.find(".table.batsman tbody tr");

        for(let j = 0;j<allTrs.length;j++)
        {
            let allTds = myDocument(allTrs[j]).find("td");
            if(allTds.length>1)
            {
                let batsmanName = myDocument(allTds[0]).text().trim();
                let runs = myDocument(allTds[2]).text().trim();
                let balls = myDocument(allTds[3]).text().trim();
                let fours = myDocument(allTds[5]).text().trim();
                let sixes = myDocument(allTds[6]).text().trim();
                let strikeRate = myDocument(allTds[7]).text().trim();

                processDetails(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
            }
        }
    }
    console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
}

function checkTeamFolder(teamName)
{
    // teamFolderPath = "./IPL/Delhi Capitaal"
    let teamFolderPath = "./IPL/" + teamName;
    return fs.existsSync(teamFolderPath);
}
function checkBatsmanFile(teamName,batsmanName)
{
    // "./IPL/Delhi Capitals/Rishabh Pant.json"
    let batsmanFilePath = `./IPL/${teamName}/${batsmanName}.json`;
    return fs.existsSync(batsmanFilePath);
}
function updateBatsManFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate)
{
    let batsmanFilePath = `./IPL/${teamName}/${batsmanName}.json`;
    let batsmanFile = JSON.parse(fs.readFileSync(batsmanFilePath));

    let inning = {
        Runs : runs,
        Balls : balls,
        Fours : fours,
        Sixes : sixes,
        StrikeRate : strikeRate
    }
    batsmanFile.push(inning);
    fs.writeFileSync(batsmanFilePath,JSON.stringify(batsmanFile));
}
function createBatsManFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate)
{
    let batsmanFilePath = `./IPL/${teamName}/${batsmanName}.json`;
    let batsmanFile = [];
    let inning = {
        Runs : runs,
        Balls : balls,
        Fours : fours,
        Sixes : sixes,
        StrikeRate : strikeRate
    }
    batsmanFile.push(inning);
    fs.writeFileSync(batsmanFilePath,JSON.stringify(batsmanFile));
} 
function createTeamFolder(teamName)
{
    let teamFolderPath = "./IPL/" + teamName;
    fs.mkdirSync(teamFolderPath);
}
function processDetails(teamName,batsmanName,runs,balls,fours,sixes,strikeRate)
{
    let isTeamFolder = checkTeamFolder(teamName);

    if(isTeamFolder)
    {
        let isBatsmanPresent = checkBatsmanFile(teamName,batsmanName);
        if(isBatsmanPresent)
        {
            updateBatsManFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
        }
        else
        {
            createBatsManFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
        }
    }
    else
    {
        createTeamFolder(teamName);
        createBatsManFile(teamName,batsmanName,runs,balls,fours,sixes,strikeRate);
    }
}
module.exports = getMatchDetails;