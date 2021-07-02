let matchLink = "https://www.espncricinfo.com/series/sri-lanka-in-england-2021-1239532/england-vs-sri-lanka-2nd-odi-1239535/full-scorecard";

const request = require("request");
const fs = require("fs");
const cheerio = require("cheerio");
// request is a high order function

request(matchLink,cb); // hof

function cb(error , response , data)
{
    // console.log(data);
    fs.writeFileSync("./match.html" , data);
    getHighestWicketTaker(data);
}

function getHighestWicketTaker(data)
{
    let myDocument = cheerio.load(data);
    let allBowlingTables = myDocument(".table.batsman");

    let HighestSixesPlayerName;
    let HighestSixes;
    let strikeRate;

    for(let i = 0;i<allBowlingTables.length;i++)
    {
        let bowlingTable = myDocument(allBowlingTables[i]);
        let allTableRows = bowlingTable.find("tbody tr");

        for(let j = 0;j<allTableRows.length;j++)
        {
            let allTds = myDocument(allTableRows[j]).find("td");
            //console.log(myDocument(allTds).text());

            if(i == 0 && j == 0)
            {
                HighestSixesPlayerName = myDocument(allTds[0]).find("a").text();
                HighestSixes = myDocument(allTds[6]).text();
                strikeRate = myDocument(allTds[7]).text();
            }
            else
            {
                let currentSixes = myDocument(allTds[6]).text();
                let currentStrikeRate = myDocument(allTds[7]).text();
                if(currentSixes > HighestSixes || (currentSixes == HighestSixes && currentStrikeRate > strikeRate ))
                {
                    HighestSixesPlayerName = myDocument(allTds[0]).find("a").text();
                    HighestSixes = currentSixes;
                    strikeRate = currentStrikeRate;
                }
            }
        }
    }
    console.log("Name of highest Sixes Player = " + HighestSixesPlayerName);
    console.log("Sixes = " + HighestSixes);
    console.log("Strike Rate = " + strikeRate);
}