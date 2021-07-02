let matchLink = "https://www.espncricinfo.com/series/sri-lanka-in-england-2021-1239532/england-vs-sri-lanka-2nd-odi-1239535/full-scorecard";

const request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");
// request is a high order function

request(matchLink,cb);

function cb(error , response , data)
{
    // console.log(data);
    fs.writeFileSync("./match.html" , data);
    getHighestWicketTaker(data);
}

function getHighestWicketTaker(data)
{
    let myDocument = cheerio.load(data);
    let allBowlingTables = myDocument(".table.bowler");

    let HighestWicketTakerName;
    let HighestWicketTaken;
    let economy;

    for(let i = 0;i<allBowlingTables.length;i++)
    {
        let bowlingTable = myDocument(allBowlingTables[i]);
        let allTableRows = bowlingTable.find("tbody tr");

        for(let j = 0;j<allTableRows.length;j++)
        {
            let allTds = myDocument(allTableRows[j]).find("td");

            if(i == 0 && j == 0)
            {
                HighestWicketTakenName = myDocument(allTds[0]).find("a").text();
                HighestWicketTaken = myDocument(allTds[4]).text();
                economy = myDocument(allTds[5]).text();
            }
            else
            {
                let currentWickets = myDocument(allTds[4]).text();
                let currenteconomy = myDocument(allTds[5]).text();
                if(currentWickets > HighestWicketTaken)
                {
                    HighestWicketTakerName = myDocument(allTds[0]).find("a").text();
                    HighestWicketsTaken = currentWickets;
                    economy = currenteconomy;
                }
            }
        }
    }

    console.log("Name of highest Wicket Taker = " + HighestWicketTakerName);
    console.log("Wickets Taken = " + HighestWicketTaken);
    console.log("Economy = " + economy);
}