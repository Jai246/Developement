const fs = require("fs");
const cheerio = require("cheerio");
const request = require("request");
let process = require("./processTables.js");

let url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/match-results";

request(url,cb);
function cb(error,response,html)
{
    itrOverScoreCard(html);
}
function itrOverScoreCard(data)
{
    // console.log(typeof(data));
    let selectorTool = cheerio.load(data);
    let scoreCardsLink = selectorTool(".card.content-block.league-scores-container .match-cta-container a");
    for(let i = 0;i<scoreCardsLink.length;i++)
    {
        let atag = selectorTool(scoreCardsLink[i]);
        let obj = atag['0'].attribs;
        if(obj['data-hover'] == "Scorecard") // coz there are three-four different data-hover
        {
            let link = "https://www.espncricinfo.com" + obj.href;
            //console.log(link);
            process(link);
        }
    }
}