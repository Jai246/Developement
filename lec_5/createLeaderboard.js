const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");


function makeLeaderBoard(matchLink)
{
    request(matchLink , function(err,res,data){
        processData(data);
    })
}

function IfPresent(file,playerName)
{
    let n = "Player Name"
    for(let i = 0;i<file.length;i++)
    {
        if(file[i][n] == playerName)
        {
            return i;
        }
    }
    return -1;
}



function processData(html)
{
    let myDocument = cheerio.load(html);
    let bothInnings =  myDocument(".card.content-block.match-scorecard-table .Collapsible");

    for(let i = 0;i<bothInnings.length;i++)
    {
        let  oneInning = bothInnings[i];
        let teamName = myDocument(oneInning).find("h5").text();
        teamName = teamName.split("INNINGS")[0].trim();
        
        console.log(teamName);

        let allTrs = myDocument(oneInning).find(".table.batsman tbody tr");

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
                
                let file = [];
                file = JSON.parse(fs.readFileSync('./leaderBoard.json'));
                
                let check = IfPresent(file , batsmanName);
                if(check == -1)
                {
                    let player = {
                        "Player Name" : batsmanName,
                        "Team Name" : teamName,
                        "Runs" : parseInt(runs),
                        "Balls" : parseInt(balls),
                        "Fours" : parseInt(fours),
                        "Sixes" : parseInt(sixes),
                        "Strike Rate" : (parseInt(runs)/parseInt(balls))*100
                    }
                    file.push(player);
                }
                else
                {
                    file[check]["Runs"] += parseInt(runs);
                    file[check]["Balls"] += parseInt(balls);
                    file[check]["Fours"] += parseInt(fours);
                    file[check]["Sixes"] += parseInt(sixes);
                    file[check]["Strike Rate"] = (file[check]["Runs"]/file[check]["Balls"]) * 100;
                }
                fs.writeFileSync("./leaderBoard.json",JSON.stringify(file));
            }
        }
    }

}
module.exports = makeLeaderBoard;